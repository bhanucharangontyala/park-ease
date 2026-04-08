package com.carparking.parkease.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.carparking.parkease.dto.BookingRequestDTO;
import com.carparking.parkease.dto.BookingResponseDTO;
import com.carparking.parkease.entity.Booking;
import com.carparking.parkease.entity.ParkingSlot;
import com.carparking.parkease.entity.Payment;
import com.carparking.parkease.entity.User;
import com.carparking.parkease.repository.BookingRepository;
import com.carparking.parkease.repository.ParkingSlotRepository;
import com.carparking.parkease.repository.PaymentRepository;
import com.carparking.parkease.repository.UserRepository;
import com.carparking.parkease.util.PriceCalculator;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class BookingService {

	private final BookingRepository bookingRepo;
	private final UserRepository userRepo;
	private final ParkingSlotRepository slotRepo;
	private final PaymentRepository paymentRepo;
	private final PriceCalculator priceCalculator;

	@Value("${razorpay.key}")
	private String key;

	@Value("${razorpay.secret}")
	private String secret;

	public BookingService(BookingRepository bookingRepo, UserRepository userRepo, ParkingSlotRepository slotRepo,
			PaymentRepository paymentRepo, PriceCalculator priceCalculator) {
		this.bookingRepo = bookingRepo;
		this.userRepo = userRepo;
		this.slotRepo = slotRepo;
		this.paymentRepo = paymentRepo;
		this.priceCalculator = priceCalculator;
	}

	// MAIN METHOD (Booking + Razorpay Order)
	public BookingResponseDTO createBookingAndOrder(BookingRequestDTO dto) throws RazorpayException {

		// 1. Fetch User
		User user = userRepo.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));

		// 2. Fetch Slot
		ParkingSlot slot = slotRepo.findById(dto.getSlotId()).orElseThrow(() -> new RuntimeException("Slot not found"));

		// 3. Validate availability
		if (!slot.isAvailable()) {
			throw new RuntimeException("Slot already booked");
		}

		// 4. Calculate dynamic price
		double totalPrice = priceCalculator.calculatePrice(slot.getPricePerHour(), dto.getStartTime(),
				dto.getEndTime());

		// 5. Create Booking
		Booking booking = new Booking();
		booking.setUser(user);
		booking.setParkingSlot(slot);
		booking.setStartTime(dto.getStartTime());
		booking.setEndTime(dto.getEndTime());
		booking.setTotalPrice(totalPrice);

		bookingRepo.save(booking);

		// 6. Create Razorpay Order
		RazorpayClient client = new RazorpayClient(key, secret);

		JSONObject options = new JSONObject();
		options.put("amount", totalPrice * 100); // INR → paise
		options.put("currency", "INR");
		options.put("receipt", "booking_" + booking.getId());

		Order order = client.orders.create(options);

		// ✅ 7. Save Payment
		Payment payment = new Payment();
		payment.setBooking(booking);
		payment.setAmount(totalPrice);
		payment.setRazorpayOrderId(order.get("id"));
		payment.setStatus("CREATED");
		paymentRepo.save(payment);
		
		return new BookingResponseDTO(booking.getId(), user.getName(), slot.getSlotNumber(), totalPrice,
				order.get("id"), "Booking created. Proceed to payment");
	}
}
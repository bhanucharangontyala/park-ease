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

import jakarta.transaction.Transactional;

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
	@Transactional
	public BookingResponseDTO createBookingAndOrder(BookingRequestDTO dto) throws RazorpayException {
		// fetching user
		User user = userRepo.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
		// fetching the slot
		ParkingSlot slot = slotRepo.findById(dto.getSlotId()).orElseThrow(() -> new RuntimeException("Slot not found"));
		// checking the availability
		if (!slot.isAvailable()) {
			throw new RuntimeException("Slot already booked");
		}
		// calculating the price
		double totalPrice = priceCalculator.calculatePrice(slot.getPricePerHour(), dto.getStartTime(),
				dto.getEndTime());
		// creating the booking
		Booking booking = new Booking();
		booking.setUser(user);
		booking.setParkingSlot(slot);
		booking.setStartTime(dto.getStartTime());
		booking.setEndTime(dto.getEndTime());
		booking.setTotalPrice(totalPrice);
		booking.setStatus("PENDING");
		
		bookingRepo.save(booking);
		//creating razorpay order
		RazorpayClient client = new RazorpayClient(key, secret);

		JSONObject options = new JSONObject();
		options.put("amount", totalPrice * 100);
		options.put("currency", "INR");
		options.put("receipt", "booking_" + booking.getId());

		Order order = client.orders.create(options);

		String orderId = order.get("id").toString();
		// save payment
		Payment payment = new Payment();
		payment.setBooking(booking);
		payment.setAmount(totalPrice);
		payment.setRazorpayOrderId(orderId);
		payment.setStatus("CREATED");

		paymentRepo.save(payment);

		return new BookingResponseDTO(booking.getId(),payment.getId() ,user.getName(), slot.getSlotNumber(), totalPrice, orderId,
				"Booking created. Proceed to payment");
	}
}
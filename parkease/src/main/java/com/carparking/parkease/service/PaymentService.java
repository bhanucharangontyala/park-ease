package com.carparking.parkease.service;

import org.springframework.stereotype.Service;

import com.carparking.parkease.entity.Booking;
import com.carparking.parkease.entity.ParkingSlot;
import com.carparking.parkease.entity.Payment;
import com.carparking.parkease.repository.ParkingSlotRepository;
import com.carparking.parkease.repository.PaymentRepository;

@Service
public class PaymentService {

	private final PaymentRepository paymentRepo;
	private final ParkingSlotRepository slotRepo;

	public PaymentService(PaymentRepository paymentRepo, ParkingSlotRepository slotRepo) {
		this.paymentRepo = paymentRepo;
		this.slotRepo = slotRepo;
	}

	// Verify payment & confirm booking
	public Payment verifyPayment(Long paymentId, String razorpayPaymentId) {

		Payment payment = paymentRepo.findById(paymentId).orElseThrow(() -> new RuntimeException("Payment not found"));

		// Update payment details
		payment.setRazorpayPaymentId(razorpayPaymentId);
		payment.setStatus("SUCCESS");

		// Mark slot unavailable
		Booking booking = payment.getBooking();
		ParkingSlot slot = booking.getParkingSlot();

		slot.setAvailable(false);
		slotRepo.save(slot);

		return paymentRepo.save(payment);
	}
}

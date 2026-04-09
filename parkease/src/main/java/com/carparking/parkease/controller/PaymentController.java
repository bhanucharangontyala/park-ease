package com.carparking.parkease.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carparking.parkease.entity.Payment;
import com.carparking.parkease.service.PaymentService;

@CrossOrigin(origins = "http://localhost:3000" )
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // Verify Razorpay payment
    @PostMapping("/verify")
    public Payment verifyPayment(@RequestParam Long paymentId,
                                @RequestParam String razorpayPaymentId) {

        return paymentService.verifyPayment(paymentId, razorpayPaymentId);
    }
}
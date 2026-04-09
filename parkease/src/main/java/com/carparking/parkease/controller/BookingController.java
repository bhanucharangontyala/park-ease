package com.carparking.parkease.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carparking.parkease.dto.BookingRequestDTO;
import com.carparking.parkease.dto.BookingResponseDTO;
import com.carparking.parkease.service.BookingService;
import com.razorpay.RazorpayException;
@CrossOrigin(origins = "http://localhost:3000" )
@RestController
@RequestMapping("/api/booking")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Create booking + Razorpay order
    @PostMapping("/create")
    public BookingResponseDTO createBooking(@RequestBody BookingRequestDTO dto)
            throws RazorpayException {

        return bookingService.createBookingAndOrder(dto);
    }
}

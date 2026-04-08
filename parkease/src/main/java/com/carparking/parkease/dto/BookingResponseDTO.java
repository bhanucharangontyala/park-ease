package com.carparking.parkease.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookingResponseDTO {

	private Long bookingId;

	private String userName;
	
	private String slotNumber;
	
	private double totalPrice;
	
	private String razorpayOrderId;
	
	private String message;

}

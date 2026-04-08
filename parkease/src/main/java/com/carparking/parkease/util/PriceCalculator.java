package com.carparking.parkease.util;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.stereotype.Component;

@Component
public class PriceCalculator {

	public double calculatePrice(double pricePerHour, LocalDateTime startTime, LocalDateTime endTime) {

		if (startTime.isAfter(endTime)) {
			throw new RuntimeException("Invalid time range");
		}

		// Calculate total hours
		long hours = Duration.between(startTime, endTime).toHours();

		// Minimum 1 hour charge
		if (hours == 0) {
			hours = 1;
		}

		double totalPrice = 0;

		// Loop hour-by-hour (for dynamic pricing)
		LocalDateTime current = startTime;

		for (int i = 0; i < hours; i++) {

			double hourlyPrice = applyDynamicPricing(pricePerHour, current.toLocalTime());
			totalPrice += hourlyPrice;

			current = current.plusHours(1);
		}

		return totalPrice;
	}

	// Dynamic pricing logic
	private double applyDynamicPricing(double basePrice, LocalTime time) {

		int hour = time.getHour();

		// Peak hours (8 AM – 11 AM)
		if (hour >= 8 && hour < 11) {
			return basePrice * 1.5;
		}

		// Evening rush (5 PM – 8 PM)
		if (hour >= 17 && hour < 20) {
			return basePrice * 1.3;
		}

		// Night discount (10 PM – 6 AM)
		if (hour >= 22 || hour < 6) {
			return basePrice * 0.8;
		}

		return basePrice;
	}
}

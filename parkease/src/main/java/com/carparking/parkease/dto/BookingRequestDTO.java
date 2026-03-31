package com.carparking.parkease.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookingRequestDTO {
	
	@NotNull
	private Long userId;
	
	@NotNull
	private Long slotId;
	
	@NotNull
	private LocalDateTime startTime;
	
	@NotNull
	private LocalDateTime endTime;

}

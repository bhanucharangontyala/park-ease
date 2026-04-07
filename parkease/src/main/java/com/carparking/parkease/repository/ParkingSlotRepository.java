package com.carparking.parkease.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carparking.parkease.entity.ParkingSlot;

@Repository
public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {
	
	public List<ParkingSlot> findByIsAvailableTrue();
	
	public ParkingSlot findBySlotNumberAndLocation(String slotNumber, String location);
	
}

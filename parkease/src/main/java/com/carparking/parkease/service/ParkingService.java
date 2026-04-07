package com.carparking.parkease.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carparking.parkease.entity.ParkingSlot;
import com.carparking.parkease.repository.ParkingSlotRepository;

import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
public class ParkingService {
	@Autowired
	private ParkingSlotRepository slotRepo;


	public List<ParkingSlot> getAvailableSlot() {
		return slotRepo.findByIsAvailableTrue();
	}

	// for admin
	public List<ParkingSlot> getAllSlots() {
		return slotRepo.findAll();
	}

	public ParkingSlot getSlotById(Long id) {
		return slotRepo.findById(id).orElseThrow();
	}

	public ParkingSlot addSlot(ParkingSlot slot) {
		ParkingSlot dbSlot = slotRepo.findBySlotNumberAndLocation(slot.getSlotNumber(), slot.getLocation());
		if (dbSlot == null) {
			slot.setAvailable(true);
			return slotRepo.save(slot);
		}
		return null;
	}

	public ParkingSlot updateSlot(Long id, ParkingSlot updatedSlot) {
		ParkingSlot slot = getSlotById(id);
		slot.setSlotNumber(updatedSlot.getSlotNumber());
		slot.setLocation(updatedSlot.getLocation());
		slot.setPricePerHour(updatedSlot.getPricePerHour());
		return slotRepo.save(slot);
	}

	public Boolean updateAvailability(Long slotId, boolean status) {
		ParkingSlot slot = getSlotById(slotId);
		slot.setAvailable(status);
		if(slotRepo.save(slot)!=null) {
			return true;
		}
		return false;
	}

	public void deleteSlot(Long id) {
		ParkingSlot slot = getSlotById(id);
		slotRepo.delete(slot);
	}
}

package com.carparking.parkease.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carparking.parkease.entity.ParkingSlot;
import com.carparking.parkease.service.ParkingService;

@CrossOrigin(origins = "http://localhost:3000" )
@RestController
@RequestMapping("Parking")
public class ParkingController {

	@Autowired
	public final ParkingService parkingService;

	public ParkingController(ParkingService parkServ) {
		this.parkingService = parkServ;
	}

	@GetMapping("GetAvailSlots")
	public List<ParkingSlot> getAvailableSlots() {
		return parkingService.getAvailableSlot();
	}

	@GetMapping("GetAllSlots")
	public List<ParkingSlot> getAllSlots() {
		return parkingService.getAllSlots();
	}

	@PostMapping("AddSlot")
	public ParkingSlot addSlot(@RequestBody ParkingSlot ps) {
		return parkingService.addSlot(ps);
	}

	@PutMapping("UpdateSlot/{id}")
	public ParkingSlot updateSlot(@PathVariable Long id, @RequestBody ParkingSlot slot) {
		return parkingService.updateSlot(id, slot);
	}

	@PatchMapping("UpdateAvail")
	public Boolean updateAvailability(@RequestParam Long slotId, @RequestParam boolean status) {
		return parkingService.updateAvailability(slotId, status);
	}
	
	@DeleteMapping("DeleteSlot/{id}")
	public void deleteSlot(@PathVariable Long id) {
		parkingService.deleteSlot(id);
	}

}

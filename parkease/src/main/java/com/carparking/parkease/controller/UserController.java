package com.carparking.parkease.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carparking.parkease.entity.User;
import com.carparking.parkease.service.UserService;

@CrossOrigin(origins = "http://localhost:3000" )
@RestController
@RequestMapping("user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("Register")
	public User register(@RequestBody User user) {
		return userService.registerUser(user);
	}

	@PatchMapping("UpdateUserDetails/{id}")
	public User updateUserDetails(@PathVariable Long id, @RequestBody User user) {
		return userService.updateUserDetails(id, user);
	}

	@GetMapping("Login")
	public User login(@RequestParam String email, @RequestParam String Password) {
		return userService.login(email, Password);
	}

	@GetMapping("GetUsers")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}

	@GetMapping("GetAdmins")
	public List<User> getAllAdmins() {
		return userService.getAllAdmins();
	}
}

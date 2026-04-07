package com.carparking.parkease.service;

import com.carparking.parkease.entity.User;
import com.carparking.parkease.repository.UserRepository;

public class UserService {

	private final UserRepository userRepo;

	public UserService(UserRepository userRepo) {
		this.userRepo = userRepo;
	}

	public User registerUser(User user) {
		return userRepo.save(user);
	}

	public User updateUserDetails(Long userId,User user) {
		User dbUser = userRepo.findById(userId).orElseThrow();
		dbUser.setName(user.getName());
		dbUser.setEmail(user.getEmail());
		return userRepo.save(dbUser);
	}
	
	public User login(String email, String password) {
	    User user = userRepo.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));
	    if (!user.getPassword().equals(password)) {
	        throw new RuntimeException("Invalid password");
	    }
	    return user;
	}
	
	
}

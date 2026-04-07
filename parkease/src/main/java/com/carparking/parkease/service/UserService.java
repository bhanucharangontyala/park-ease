package com.carparking.parkease.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carparking.parkease.entity.Role;
import com.carparking.parkease.entity.User;
import com.carparking.parkease.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;

	public User registerUser(User user) {
		return userRepo.save(user);
	}

	public User updateUserDetails(Long userId, User user) {
		User dbUser = userRepo.findById(userId).orElseThrow();
		dbUser.setName(user.getName());
		dbUser.setEmail(user.getEmail());
		return userRepo.save(dbUser);
	}

	public User login(String email, String password) {
		User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
		if (!user.getPassword().equals(password)) {
			throw new RuntimeException("Invalid password");
		}
		return user;
	}

	public List<User> getAllUsers() {
		return userRepo.findByRole(Role.USER);
	}
	
	public List<User> getAllAdmins(){
		return userRepo.findByRole(Role.ADMIN);
	}

}

package com.carparking.parkease.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carparking.parkease.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}

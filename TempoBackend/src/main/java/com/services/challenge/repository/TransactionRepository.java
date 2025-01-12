package com.services.challenge.repository;

import com.services.challenge.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    long countByNameClient(String nameClient);
}

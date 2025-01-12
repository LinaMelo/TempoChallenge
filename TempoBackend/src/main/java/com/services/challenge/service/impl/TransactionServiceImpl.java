package com.services.challenge.service.impl;


import com.services.challenge.exception.GenericException;
import com.services.challenge.model.Transaction;
import com.services.challenge.repository.TransactionRepository;
import com.services.challenge.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository repository;

    public List<Transaction> findAllTransactions() {
        return repository.findAll();
    }

    public Transaction saveTransaction(Transaction transaction) {
        if (transaction.getAmount() < 0) {
            throw new GenericException(HttpStatus.BAD_REQUEST,"El monto no puede ser negativo");
        }
        if (transaction.getTransactionDate().isAfter(LocalDateTime.now())) {
            throw new GenericException(HttpStatus.BAD_REQUEST,"La fecha no puede ser futura");
        }
        long count = repository.countByNameClient(transaction.getNameClient());
        if (count >= 100) {
            throw new GenericException(HttpStatus.BAD_REQUEST,"El cliente ya tiene 100 transacciones");
        }
        return repository.save(transaction);
    }

    public Transaction updateTransaction(Transaction transaction) {
        return repository.save(transaction);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

package com.services.challenge.service.impl;


import com.services.challenge.exception.GenericException;
import com.services.challenge.model.Transaction;
import com.services.challenge.repository.TransactionRepository;
import com.services.challenge.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository repository;

    public List<Transaction> findAllTransactions() {
        return repository.findAll();
    }

    public Transaction saveTransaction(Transaction transaction) {
        ZoneId chileZoneId = ZoneId.of("America/Santiago");
        ZonedDateTime nowInChile = ZonedDateTime.now(chileZoneId);
        ZonedDateTime transactionDateInChile = transaction.getTransactionDate()
                .atZone(chileZoneId);

        if (transactionDateInChile.isAfter(nowInChile)) {
            throw new GenericException(HttpStatus.BAD_REQUEST, "La fecha no puede ser futura");
        }
        if (transaction.getAmount() < 0) {
            throw new GenericException(HttpStatus.BAD_REQUEST, "El monto no puede ser negativo");
        }
        long count = repository.countByNameClient(transaction.getNameClient());
        if (count >= 100) {
            throw new GenericException(HttpStatus.BAD_REQUEST, "El cliente ya tiene 100 transacciones");
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

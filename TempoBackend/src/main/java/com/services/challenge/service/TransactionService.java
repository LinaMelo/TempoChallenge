package com.services.challenge.service;

import com.services.challenge.model.Transaction;

import java.util.List;

/**
 * Interfaz en la que se declaran los metodos del servicio de transacciones
 */
public interface TransactionService {

    List<Transaction> findAllTransactions();
    Transaction saveTransaction(Transaction transaction);
    Transaction updateTransaction(Transaction transaction);
    void delete(Long id);
}

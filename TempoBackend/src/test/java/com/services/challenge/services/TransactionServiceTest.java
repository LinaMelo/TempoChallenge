package com.services.challenge.services;

import com.services.challenge.exception.GenericException;
import com.services.challenge.model.Transaction;
import com.services.challenge.repository.TransactionRepository;
import com.services.challenge.service.TransactionService;
import com.services.challenge.service.impl.TransactionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class TransactionServiceTest {

    @Mock
    private TransactionRepository repository;

    @InjectMocks
    private TransactionServiceImpl service;

    private Transaction transaction;

    @BeforeEach
    public void setUp() {
        transaction = new Transaction();
        transaction.setId(1L);
        transaction.setAmount(20000);
        transaction.setCommerce("Yogen Fruzz");
        transaction.setNameClient("Milena Ortiz");
        transaction.setTransactionDate(LocalDateTime.of(2025, 1, 7, 14, 30, 0));
    }

    @Test
    public void testFindAllTransactions() {
        List<Transaction> transactions = Arrays.asList(transaction);
        when(repository.findAll()).thenReturn(transactions);

        List<Transaction> result = service.findAllTransactions();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Milena Ortiz", result.get(0).getNameClient());
        assertEquals("Yogen Fruzz", result.get(0).getCommerce());
        assertEquals(20000, result.get(0).getAmount());
        assertEquals(LocalDateTime.of(2025, 1, 7, 14, 30, 0), result.get(0).getTransactionDate());
    }

    @Test
    public void testSaveTransaction() {
        when(repository.save(transaction)).thenReturn(transaction);

        Transaction savedTransaction = service.saveTransaction(transaction);

        assertNotNull(savedTransaction);
        assertEquals("Milena Ortiz", savedTransaction.getNameClient());
        assertEquals("Yogen Fruzz", savedTransaction.getCommerce());
        assertEquals(20000, savedTransaction.getAmount());
        assertEquals(LocalDateTime.of(2025, 1, 7, 14, 30, 0), savedTransaction.getTransactionDate());
    }

    @Test
    void testSaveTransactionAmountNegative() {
        // Crear una transacción con monto negativo
        Transaction transaction = new Transaction();
        transaction.setAmount(-5000);  // Monto negativo
        transaction.setCommerce("Comercio XYZ");
        transaction.setNameClient("Juan Pérez");
        transaction.setTransactionDate(LocalDateTime.now());

        // Verificar que se lanza la excepción cuando el monto es negativo
        GenericException exception = assertThrows(GenericException.class, () -> {
            service.saveTransaction(transaction);
        });

        assertThat(exception.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(exception.getMessage()).isEqualTo("El monto no puede ser negativo");
    }


    @Test
    void testSaveTransactionDateInFuture() {
        // Crear una transacción con fecha futura
        Transaction transaction = new Transaction();
        transaction.setAmount(5000);
        transaction.setCommerce("Lider");
        transaction.setNameClient("Juan Pérez");
        transaction.setTransactionDate(LocalDateTime.now().plusDays(1));  // Fecha futura

        // Verificar que se lanza la excepción cuando la fecha es futura
        GenericException exception = assertThrows(GenericException.class, () -> {
            service.saveTransaction(transaction);
        });

        assertThat(exception.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(exception.getMessage()).isEqualTo("La fecha no puede ser futura");
    }

    @Test
    void testSaveTransactionClientHas100Transactions() {
        // Suponemos que el método repository.countByNameClient devuelve 100
        String clientName = "Juan Pérez";
        when(repository.countByNameClient(clientName)).thenReturn(100L);

        // Crear una transacción para un cliente con 100 transacciones
        Transaction transaction = new Transaction();
        transaction.setAmount(5000);
        transaction.setCommerce("Lider");
        transaction.setNameClient(clientName);
        transaction.setTransactionDate(LocalDateTime.now());

        // Verificar que se lanza la excepción cuando el cliente tiene 100 transacciones
        GenericException exception = assertThrows(GenericException.class, () -> {
            service.saveTransaction(transaction);
        });

        assertThat(exception.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(exception.getMessage()).isEqualTo("El cliente ya tiene 100 transacciones");
    }


    @Test
    public void testUpdateTransaction() {
        when(repository.save(transaction)).thenReturn(transaction);

        Transaction updatedTransaction = service.updateTransaction(transaction);

        assertNotNull(updatedTransaction);
        assertEquals("Milena Ortiz", updatedTransaction.getNameClient());
        assertEquals("Yogen Fruzz", updatedTransaction.getCommerce());
        assertEquals(20000, updatedTransaction.getAmount());
        assertEquals(LocalDateTime.of(2025, 1, 7, 14, 30, 0), updatedTransaction.getTransactionDate());
    }

    @Test
    public void testDeleteTransaction() {
        doNothing().when(repository).deleteById(1L);

        service.delete(1L);

        verify(repository, times(1)).deleteById(1L);
    }
}

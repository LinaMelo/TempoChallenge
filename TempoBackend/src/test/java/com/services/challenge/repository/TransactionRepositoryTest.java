package com.services.challenge.repository;

import com.services.challenge.model.Transaction;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class TransactionRepositoryTest {

    @Autowired
    private TransactionRepository transactionRepository;

    @Test
    public void testCountByNameClient() {
        // Crear y guardar transacciones
        Transaction transaction1 = new Transaction();
        transaction1.setAmount(5000);
        transaction1.setCommerce("Uber EatsCL");
        transaction1.setNameClient("Samuel Simonds");
        transaction1.setTransactionDate(LocalDateTime.now());
        transactionRepository.save(transaction1);

        Transaction transaction2 = new Transaction();
        transaction2.setAmount(3000);
        transaction2.setCommerce("Comercio ABC");
        transaction2.setNameClient("Samuel Simonds");
        transaction2.setTransactionDate(LocalDateTime.now());
        transactionRepository.save(transaction2);

        // Verificar el conteo de transacciones de "Samuel Simonds"
        long count = transactionRepository.countByNameClient("Samuel Simonds");
        assertThat(count).isEqualTo(2);
    }

    @Test
    public void testDeleteTransaction() {
        // Crear y guardar una transacción
        Transaction transaction = new Transaction();
        transaction.setAmount(5000);
        transaction.setCommerce("Uber EatsCL");
        transaction.setNameClient("Samuel Simonds");
        transaction.setTransactionDate(LocalDateTime.now());
        transactionRepository.save(transaction);

        // Verificar que la transacción existe
        long countBeforeDelete = transactionRepository.count();
        assertThat(countBeforeDelete).isEqualTo(1);

        // Eliminar la transacción
        transactionRepository.delete(transaction);

        // Verificar que la transacción ha sido eliminada
        long countAfterDelete = transactionRepository.count();
        assertThat(countAfterDelete).isEqualTo(0);
    }
    @Test
    public void testSaveTransaction() {
        // Crear una nueva transacción
        Transaction transaction = new Transaction();
        transaction.setAmount(5000);
        transaction.setCommerce("Uber EatsCL");
        transaction.setNameClient("Samuel Simonds");
        transaction.setTransactionDate(LocalDateTime.now());

        // Guardar la transacción
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Verificar que la transacción ha sido guardada
        assertThat(savedTransaction).isNotNull();
        assertThat(savedTransaction.getId()).isNotNull();
        assertThat(savedTransaction.getNameClient()).isEqualTo("Samuel Simonds");
    }

}

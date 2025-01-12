package com.services.challenge.controller;

import com.services.challenge.model.Transaction;
import com.services.challenge.service.TransactionService;
import com.services.challenge.service.impl.TransactionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class TransactionControllerTest {

    private MockMvc mockMvc;

    @Mock
    private TransactionService service;

    @InjectMocks
    private TransactionController controller;

    private Transaction transaction;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
        transaction = new Transaction();
        transaction.setId(1L);
        transaction.setAmount(5000);
        transaction.setCommerce("Doggis");
        transaction.setNameClient("Juan Pérez");
        transaction.setTransactionDate(LocalDateTime.of(2025, 1, 9, 14, 30, 0));
    }

    @Test
    public void testGetAllTransactions() throws Exception {
        List<Transaction> transactions = Arrays.asList(transaction);

        when(service.findAllTransactions()).thenReturn(transactions);

        mockMvc.perform(get("/transaction"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].amount").value(5000))
                .andExpect(jsonPath("$[0].commerce").value("Doggis"))
                .andExpect(jsonPath("$[0].nameClient").value("Juan Pérez"));

        verify(service, times(1)).findAllTransactions();
    }

    @Test
    public void testCreateTransaction() throws Exception {
        when(service.saveTransaction(any(Transaction.class))).thenReturn(transaction);

        mockMvc.perform(post("/transaction")
                        .contentType("application/json")
                        .content("{\"amount\": 5000, \"commerce\": \"Doggis\", \"nameClient\": \"Juan Pérez\", \"transactionDate\": \"2025-01-09T14:30:00\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.amount").value(5000))
                .andExpect(jsonPath("$.commerce").value("Doggis"))
                .andExpect(jsonPath("$.nameClient").value("Juan Pérez"));

        verify(service, times(1)).saveTransaction(any(Transaction.class));
    }

    @Test
    public void testUpdateTransaction() throws Exception {
        when(service.updateTransaction(any(Transaction.class))).thenReturn(transaction);

        mockMvc.perform(put("/transaction")
                        .contentType("application/json")
                        .content("{\"id\": 1, \"amount\": 5000, \"commerce\": \"Doggis\", \"nameClient\": \"Juan Pérez\", \"transactionDate\": \"2025-01-09T14:30:00\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.amount").value(5000))
                .andExpect(jsonPath("$.commerce").value("Doggis"))
                .andExpect(jsonPath("$.nameClient").value("Juan Pérez"));

        verify(service, times(1)).updateTransaction(any(Transaction.class));
    }

    @Test
    public void testDeleteTransaction() throws Exception {
        doNothing().when(service).delete(1L);

        mockMvc.perform(delete("/transaction/1"))
                .andExpect(status().isNoContent());

        verify(service, times(1)).delete(1L);
    }
}

package com.services.challenge.controller;

import com.services.challenge.model.Transaction;
import com.services.challenge.service.TransactionService;
import com.services.challenge.service.impl.TransactionServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador para gestionar transacciones.
 */
@RestController
@RequestMapping("/transaction")
@Tag(name = "Transactions", description = "API para gestionar transacciones")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionService service;

    /**
     * Obtiene todas las transacciones.
     *
     * @return Lista de transacciones
     */
    @Operation(summary = "Endpoint para obtener todas las transacciones")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de todas las transacciones"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Transaction> getAllTransactions() {
        return service.findAllTransactions();
    }

    /**
     * Crea una nueva transacción.
     *
     * @param transaction objeto de la transacción
     * @return la transacción creada
     */
    @Operation(summary = "Guardar una nueva transacción")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Transacción guardada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        Transaction savedTransaction = service.saveTransaction(transaction);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTransaction);
    }

    /**
     * Modifica una transacción existente.
     *
     * @param transaction objeto de la transacción a modificar
     * @return la transacción actualizada
     */
    @Operation(summary = "Modificar una transacción")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Transacción actualizada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta"),
            @ApiResponse(responseCode = "404", description = "Transacción no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Transaction> updateTransaction(@RequestBody Transaction transaction) {
        Transaction updatedTransaction = service.updateTransaction(transaction);
        return ResponseEntity.ok(updatedTransaction);
    }

    /**
     * Elimina una transacción.
     *
     * @param id el ID de la transacción a eliminar
     * @return respuesta sin contenido si la eliminación es exitosa
     */
    @Operation(summary = "Eliminar una transacción")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Transacción eliminada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Transacción no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

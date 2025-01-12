package com.services.challenge.model;

import jakarta.persistence.*;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

/**
 * Clase que representa una transacción en el sistema.
 */
@Data
@Entity
@Table(name = "transaction")
@Schema(description = "Representa una transacción realizada por un cliente en el sistema.")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID único de la transacción")
    private Long id;

    @Column(nullable = false)
    @Schema(description = "Monto de la transacción", example = "500", required = true)
    private int amount;

    @Column(nullable = false, length = 255)
    @Schema(description = "Nombre del comercio donde se realizó la transacción", example = "Comercio XYZ", required = true)
    private String commerce;

    @Column(name = "name_client", nullable = false, length = 255)
    @Schema(description = "Nombre del cliente que realizó la transacción", example = "Juan Pérez", required = true)
    private String nameClient;

    @Column(name = "transaction_date", nullable = false)
    @Schema(description = "Fecha y hora en que se realizó la transacción", example = "2025-01-09T14:30:00", required = true)
    private LocalDateTime transactionDate;
}

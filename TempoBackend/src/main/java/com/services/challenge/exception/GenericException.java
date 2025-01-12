package com.services.challenge.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class GenericException extends RuntimeException{

    private final HttpStatus status;
    private final String message;

    /**
     * Constructor para la excepción personalizada.
     *
     * @param status  el código de estado HTTP que se debe devolver
     * @param message el mensaje de error detallado
     */
    public GenericException(HttpStatus status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

package com.epn.bookstore;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public class BookCreateDTO {
    @NotBlank
    public String titulo;

    @NotNull
    @DecimalMin(value = "0.01", message = "El precio debe ser > 0")
    public BigDecimal precio;

    @NotNull
    public LocalDate fechaPublicacion;

    @NotNull
    public Long authorId;
}

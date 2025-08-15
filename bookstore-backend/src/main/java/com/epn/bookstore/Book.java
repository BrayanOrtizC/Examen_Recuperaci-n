package com.epn.bookstore;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "books")
public class Book extends PanacheEntity {
    public String titulo;

    @Column(precision = 10, scale = 2)
    public BigDecimal precio;

    public LocalDate fechaPublicacion;

    @ManyToOne(optional = false)
    public Author author;
}

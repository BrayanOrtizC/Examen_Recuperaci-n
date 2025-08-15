package com.epn.bookstore;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BookView {
    public Long id;
    public String titulo;
    public BigDecimal precio;
    public LocalDate fechaPublicacion;
    public Long authorId;
    public String authorNombre;

    public static BookView from(Book b) {
        BookView v = new BookView();
        v.id = b.id;
        v.titulo = b.titulo;
        v.precio = b.precio;
        v.fechaPublicacion = b.fechaPublicacion;
        v.authorId = b.author.id;
        v.authorNombre = b.author.nombre;
        return v;
    }
}

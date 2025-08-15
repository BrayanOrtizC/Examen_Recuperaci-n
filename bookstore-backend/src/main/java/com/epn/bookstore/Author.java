package com.epn.bookstore;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import java.util.List;

@Entity
@Table(name = "authors")
public class Author extends PanacheEntity {
    public String nombre;
    public String nacionalidad;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    public List<Book> books;
}

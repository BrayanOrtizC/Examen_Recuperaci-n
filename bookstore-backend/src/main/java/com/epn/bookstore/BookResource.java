package com.epn.bookstore;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Path("/books")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BookResource {

    @GET
    public List<BookView> all() {
        return Book.<Book>listAll()
                .stream().map(BookView::from)
                .collect(Collectors.toList());
    }

    @GET
    @Path("/author/{id}")
    public List<BookView> byAuthor(@PathParam("id") Long authorId) {
        Author a = Author.findById(authorId);
        if (a == null) throw new NotFoundException("Autor no existe");
        return Book.<Book>list("author", a).stream().map(BookView::from).collect(Collectors.toList());
    }

    @POST
    @Transactional
    public Response create(@Valid BookCreateDTO dto) {
        Author a = Author.findById(dto.authorId);
        if (a == null) throw new NotFoundException("Autor no existe");

        Book b = new Book();
        b.titulo = dto.titulo;
        b.precio = dto.precio;
        b.fechaPublicacion = dto.fechaPublicacion;
        b.author = a;
        b.persist();

        return Response.created(URI.create("/books/" + b.id)).entity(BookView.from(b)).build();
    }
}

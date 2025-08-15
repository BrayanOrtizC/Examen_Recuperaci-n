package com.epn.bookstore;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;

@Path("/authors")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthorResource {

    @GET
    public List<Author> list() {
        return Author.listAll();
    }

    @POST
    @Transactional
    public Response create(Author a) {
        if (a == null || a.nombre == null || a.nombre.isBlank()) {
            throw new BadRequestException("nombre es requerido");
        }
        a.id = null;
        a.persist();
        return Response.created(URI.create("/authors/" + a.id)).entity(a).build();
    }

    @GET
    @Path("{id}")
    public Author get(@PathParam("id") Long id) {
        Author a = Author.findById(id);
        if (a == null) throw new NotFoundException("Autor no existe");
        return a;
    }
}

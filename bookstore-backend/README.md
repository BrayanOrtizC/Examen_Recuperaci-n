# Bookstore Backend (Quarkus + PostgreSQL)

## Correr con Docker
Requisitos: Docker Desktop.

```bash
docker compose up --build
```
Luego prueba en `http://localhost:8080/books`.

## Endpoints
- POST /authors
- GET /books
- POST /books
- GET /books/author/{id}

## Ejemplos JSON
### Crear autor
{
  "nombre": "Isabel Allende",
  "nacionalidad": "Chile"
}

### Crear libro
{
  "titulo": "La casa de los espíritus",
  "precio": 25.50,
  "fechaPublicacion": "1982-01-01",
  "authorId": 1
}

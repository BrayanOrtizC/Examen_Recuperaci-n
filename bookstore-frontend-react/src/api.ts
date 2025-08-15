export type BookView = {
  id: number
  titulo: string
  precio: number
  fechaPublicacion: string
  authorId: number
  authorNombre: string
}

export type BookCreateDTO = {
  titulo: string
  precio: number
  fechaPublicacion: string
  authorId: number
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export async function listBooks(): Promise<BookView[]> {
  const res = await fetch(`${API_URL}/books`)
  if (!res.ok) throw new Error('Error listando libros')
  return res.json()
}

export async function createBook(dto: BookCreateDTO): Promise<BookView> {
  const res = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Error creando libro: ${res.status} ${txt}`)
  }
  return res.json()
}

import { useEffect, useState } from 'react'
import { listBooks, createBook, BookView, BookCreateDTO } from './api'

export default function App() {
  const [books, setBooks] = useState<BookView[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<BookCreateDTO>({
    titulo: '',
    precio: 0,
    fechaPublicacion: '',
    authorId: 1,
  })

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const data = await listBooks()
      setBooks(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.titulo.trim()) return setError('El título es requerido')
    if (form.precio <= 0) return setError('El precio debe ser > 0')
    if (!form.fechaPublicacion) return setError('La fecha es requerida (YYYY-MM-DD)')
    try {
      await createBook(form)
      setForm({ titulo: '', precio: 0, fechaPublicacion: '', authorId: form.authorId })
      await load()
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Bookstore</h1>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Crear libro</h5>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={onSubmit} className="row g-3">
                <div className="col-12">
                  <label className="form-label">Título</label>
                  <input className="form-control" value={form.titulo}
                    onChange={e => setForm({ ...form, titulo: e.target.value })} />
                </div>
                <div className="col-6">
                  <label className="form-label">Precio</label>
                  <input type="number" step="0.01" className="form-control" value={form.precio}
                    onChange={e => setForm({ ...form, precio: Number(e.target.value) })} />
                </div>
                <div className="col-6">
                  <label className="form-label">Fecha</label>
                  <input type="date" className="form-control" value={form.fechaPublicacion}
                    onChange={e => setForm({ ...form, fechaPublicacion: e.target.value })} />
                </div>
                <div className="col-6">
                  <label className="form-label">Author ID</label>
                  <input type="number" className="form-control" value={form.authorId}
                    onChange={e => setForm({ ...form, authorId: Number(e.target.value) })} />
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">Guardar</button>
                </div>
              </form>
              <p className="text-muted mt-2">* Debe existir un autor con ese ID (crear en Postman con <code>/authors</code>).</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Libros</h5>
                <button className="btn btn-outline-secondary btn-sm" onClick={load} disabled={loading}>
                  {loading ? 'Cargando...' : 'Refrescar'}
                </button>
              </div>
              <div className="table-responsive mt-3">
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>ID</th><th>Título</th><th>Autor</th><th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.length === 0 && (
                      <tr><td colSpan={4} className="text-center text-muted">Sin datos</td></tr>
                    )}
                    {books.map(b => (
                      <tr key={b.id}>
                        <td>{b.id}</td><td>{b.titulo}</td><td>{b.authorNombre}</td><td>{b.precio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { personsApi } from '../api/persons'
import PersonForm from '../components/PersonForm'
import PersonTable from '../components/PersonTable'
import EmptyState from '../components/EmptyState'
import Modal from '../components/Modal'
import { useToast } from '../components/Toast'

export default function PersonsPage() {
  const toast = useToast()
  const [persons, setPersons] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState(null) // 'create' | { edit: person } | { delete: person }
  const [submitting, setSubmitting] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const data = await personsApi.getAll()
      setPersons(data)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return persons
    const q = query.trim().toLowerCase()
    return persons.filter(
      (p) =>
        p.code.toLowerCase().includes(q) ||
        p.firstName.toLowerCase().includes(q) ||
        p.lastName.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q),
    )
  }, [persons, query])

  async function handleCreate(values) {
    setSubmitting(true)
    try {
      await personsApi.create(values)
      toast.success('Persona registrada correctamente')
      setModal(null)
      load()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleUpdate(id, values) {
    setSubmitting(true)
    try {
      await personsApi.update(id, values)
      toast.success('Datos actualizados')
      setModal(null)
      load()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(person) {
    setSubmitting(true)
    try {
      await personsApi.remove(person.id)
      toast.success('Persona eliminada')
      setModal(null)
      load()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="font-mono text-xs tracking-widest text-ink-soft uppercase">Directorio</p>
          <h1 className="text-2xl font-semibold text-ink mt-1">Personas</h1>
        </div>
        <button onClick={() => setModal('create')} className="btn-primary">
          + Nueva persona
        </button>
      </div>

      <input
        className="field-input max-w-sm"
        placeholder="Buscar por código, nombre o correo…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p className="text-sm text-ink-soft">Cargando…</p>
      ) : filtered.length === 0 ? (
        <EmptyState
          title={query ? 'Sin resultados' : 'Aún no hay personas registradas'}
          description={query ? 'Prueba con otro término de búsqueda.' : 'Registra la primera persona para comenzar.'}
        />
      ) : (
        <PersonTable
          persons={filtered}
          onEdit={(p) => setModal({ edit: p })}
          onDelete={(p) => setModal({ delete: p })}
        />
      )}

      {modal === 'create' && (
        <Modal title="Registrar persona" onClose={() => setModal(null)}>
          <PersonForm onSubmit={handleCreate} onCancel={() => setModal(null)} submitting={submitting} />
        </Modal>
      )}

      {modal?.edit && (
        <Modal title="Editar persona" onClose={() => setModal(null)}>
          <PersonForm
            isEdit
            initial={modal.edit}
            onSubmit={(values) => handleUpdate(modal.edit.id, values)}
            onCancel={() => setModal(null)}
            submitting={submitting}
          />
        </Modal>
      )}

      {modal?.delete && (
        <Modal title="Eliminar persona" onClose={() => setModal(null)}>
          <p className="text-sm text-ink-soft mb-5">
            ¿Eliminar a <span className="font-semibold text-ink">{modal.delete.firstName} {modal.delete.lastName}</span>?
            Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-3">
            <button
              className="btn-danger flex-1"
              disabled={submitting}
              onClick={() => handleDelete(modal.delete)}
            >
              {submitting ? 'Eliminando…' : 'Sí, eliminar'}
            </button>
            <button className="btn-secondary" onClick={() => setModal(null)}>
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

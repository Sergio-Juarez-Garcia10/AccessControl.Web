import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { visitsApi } from '../api/visits'
import { personsApi } from '../api/persons'
import VisitTable from '../components/VisitTable'
import EmptyState from '../components/EmptyState'
import { useToast } from '../components/Toast'

export default function DashboardPage() {
  const toast = useToast()
  const [active, setActive] = useState([])
  const [personCount, setPersonCount] = useState(null)
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const [visits, persons] = await Promise.all([visitsApi.getActive(), personsApi.getAll()])
      setActive(visits)
      setPersonCount(persons.length)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs tracking-widest text-ink-soft uppercase">Hoja de hoy</p>
        <h1 className="text-2xl font-semibold text-ink mt-1">Panel general</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <StatCard label="Visitas activas" value={loading ? '—' : active.length} accent="active" />
        <StatCard label="Personas registradas" value={loading ? '—' : personCount ?? '—'} accent="ink" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-ink">Visitas en curso</h2>
          <Link to="/visitas" className="text-sm font-semibold text-ink hover:underline">
            Ir a Visitas →
          </Link>
        </div>
        {loading ? (
          <p className="text-sm text-ink-soft">Cargando…</p>
        ) : active.length === 0 ? (
          <EmptyState title="No hay visitas activas" description="Las entradas registradas aparecerán aquí." />
        ) : (
          <VisitTable visits={active} />
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, accent }) {
  return (
    <div className="ledger-card px-5 py-4">
      <p className="font-mono text-xs tracking-widest text-ink-soft uppercase">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${accent === 'active' ? 'text-stamp-active' : 'text-ink'}`}>{value}</p>
    </div>
  )
}

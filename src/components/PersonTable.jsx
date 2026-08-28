import { Link } from 'react-router-dom'

export default function PersonTable({ persons, onEdit, onDelete }) {
  return (
    <div className="ledger-card overflow-hidden">
      {/* Desktop table */}
      <table className="hidden md:table w-full text-sm">
        <thead>
          <tr className="border-b border-paper-line text-left text-xs uppercase tracking-wide text-ink-soft">
            <th className="px-4 py-3 font-semibold">Código</th>
            <th className="px-4 py-3 font-semibold">Nombre</th>
            <th className="px-4 py-3 font-semibold">Correo</th>
            <th className="px-4 py-3 font-semibold">Teléfono</th>
            <th className="px-4 py-3 font-semibold text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((p) => (
            <tr key={p.id} className="border-b border-paper-line last:border-0 hover:bg-white/40">
              <td className="px-4 py-3 font-mono text-ink-light">{p.code}</td>
              <td className="px-4 py-3">
                <Link to={`/personas/${p.id}/historial`} className="font-medium text-ink hover:underline">
                  {p.firstName} {p.lastName}
                </Link>
              </td>
              <td className="px-4 py-3 text-ink-soft">{p.email}</td>
              <td className="px-4 py-3 font-mono text-ink-soft">{p.phoneNumber}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(p)} className="text-xs font-semibold text-ink hover:underline">
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className="text-xs font-semibold text-stamp-alert hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile cards */}
      <ul className="md:hidden divide-y divide-paper-line">
        {persons.map((p) => (
          <li key={p.id} className="px-4 py-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link to={`/personas/${p.id}/historial`} className="font-medium text-ink block truncate">
                  {p.firstName} {p.lastName}
                </Link>
                <p className="font-mono text-xs text-ink-soft mt-0.5">{p.code}</p>
                <p className="text-xs text-ink-soft mt-1 truncate">{p.email}</p>
                <p className="font-mono text-xs text-ink-soft">{p.phoneNumber}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button onClick={() => onEdit(p)} className="text-xs font-semibold text-ink">
                  Editar
                </button>
                <button onClick={() => onDelete(p)} className="text-xs font-semibold text-stamp-alert">
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

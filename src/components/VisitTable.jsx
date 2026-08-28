import StatusStamp from './StatusStamp'
import { formatDateTime, formatDuration } from '../utils/format'

export default function VisitTable({ visits, showPerson = true }) {
  return (
    <div className="ledger-card overflow-hidden">
      {/* Desktop table */}
      <table className="hidden md:table w-full text-sm">
        <thead>
          <tr className="border-b border-paper-line text-left text-xs uppercase tracking-wide text-ink-soft">
            {showPerson && <th className="px-4 py-3 font-semibold">Persona</th>}
            <th className="px-4 py-3 font-semibold">Entrada</th>
            <th className="px-4 py-3 font-semibold">Salida</th>
            <th className="px-4 py-3 font-semibold">Duración</th>
            <th className="px-4 py-3 font-semibold">Estado</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((v) => (
            <tr key={v.id} className="border-b border-paper-line last:border-0 hover:bg-white/40">
              {showPerson && (
                <td className="px-4 py-3">
                  <span className="font-medium text-ink">
                    {v.person ? `${v.person.firstName} ${v.person.lastName}` : '—'}
                  </span>
                  {v.person?.code && <span className="ml-2 font-mono text-xs text-ink-soft">{v.person.code}</span>}
                </td>
              )}
              <td className="px-4 py-3 font-mono text-ink-light">{formatDateTime(v.entryTime)}</td>
              <td className="px-4 py-3 font-mono text-ink-light">{formatDateTime(v.exitTime)}</td>
              <td className="px-4 py-3 text-ink-soft">{formatDuration(v.entryTime, v.exitTime)}</td>
              <td className="px-4 py-3">
                <StatusStamp active={!v.exitTime} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile cards */}
      <ul className="md:hidden divide-y divide-paper-line">
        {visits.map((v) => (
          <li key={v.id} className="px-4 py-3.5">
            <div className="flex items-start justify-between gap-3 mb-2">
              {showPerson ? (
                <div className="min-w-0">
                  <p className="font-medium text-ink truncate">
                    {v.person ? `${v.person.firstName} ${v.person.lastName}` : '—'}
                  </p>
                  {v.person?.code && <p className="font-mono text-xs text-ink-soft">{v.person.code}</p>}
                </div>
              ) : (
                <span />
              )}
              <StatusStamp active={!v.exitTime} />
            </div>
            <div className="flex items-center text-xs font-mono text-ink-soft">
              <span>{formatDateTime(v.entryTime)}</span>
              <span className="dot-leader" />
              <span>{formatDateTime(v.exitTime)}</span>
            </div>
            <p className="text-xs text-ink-soft mt-1">Duración: {formatDuration(v.entryTime, v.exitTime)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

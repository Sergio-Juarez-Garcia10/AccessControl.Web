import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { personsApi } from "../api/persons";
import { visitsApi } from "../api/visits";
import VisitTable from "../components/VisitTable";
import EmptyState from "../components/EmptyState";
import { useToast } from "../components/Toast";

export default function PersonHistoryPage() {
  const { id } = useParams();
  const toast = useToast();
  const [person, setPerson] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [p, v] = await Promise.all([
          personsApi.getById(id),
          visitsApi.getByPerson(id),
        ]);
        setPerson(p);
        setVisits(v);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return (
    <div className="space-y-6">
      <Link
        to="/personas"
        className="text-sm font-semibold text-ink-soft hover:text-ink"
      >
        ← Volver a personas
      </Link>

      {loading ? (
        <p className="text-sm text-ink-soft">Cargando…</p>
      ) : !person ? (
        <EmptyState title="Persona no encontrada" />
      ) : (
        <>
          <div>
            <p className="font-mono text-xs tracking-widest text-ink-soft uppercase">
              Historial de accesos
            </p>
            <h1 className="text-2xl font-semibold text-ink mt-1">
              {person.firstName} {person.lastName}
            </h1>
            <p className="font-mono text-sm text-ink-soft mt-1">
              {person.code} · {person.email}
            </p>
          </div>

          {visits.length === 0 ? (
            <EmptyState
              title="Sin visitas registradas"
              description="Esta persona aún no tiene entradas registradas."
            />
          ) : (
            <VisitTable visits={visits} showPerson={false} />
          )}
        </>
      )}
    </div>
  );
}

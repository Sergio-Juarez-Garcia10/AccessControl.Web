import { useEffect, useState } from "react";
import { visitsApi } from "../api/visits";
import CodeActionForm from "../components/CodeActionForm";
import VisitTable from "../components/VisitTable";
import EmptyState from "../components/EmptyState";
import { useToast } from "../components/Toast";

const TABS = [
  { id: "active", label: "Activas" },
  { id: "all", label: "Todas" },
];

export default function VisitsPage() {
  const toast = useToast();
  const [tab, setTab] = useState("active");
  const [active, setActive] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entrySubmitting, setEntrySubmitting] = useState(false);
  const [exitSubmitting, setExitSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [activeVisits, allVisits] = await Promise.all([
        visitsApi.getActive(),
        visitsApi.getAll(),
      ]);
      setActive(activeVisits);
      setAll(allVisits);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleEntry(code) {
    setEntrySubmitting(true);
    try {
      await visitsApi.registerEntry({ code });
      toast.success(`Entrada registrada para el código ${code}`);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setEntrySubmitting(false);
    }
  }

  async function handleExit(code) {
    setExitSubmitting(true);
    try {
      await visitsApi.registerExit({ code });
      toast.success(`Salida registrada para el código ${code}`);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setExitSubmitting(false);
    }
  }

  const list = tab === "active" ? active : all;

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs tracking-widest text-ink-soft uppercase">
          Registro de movimientos
        </p>
        <h1 className="text-2xl font-semibold text-ink mt-1">Visitas</h1>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="ledger-card p-4">
          <CodeActionForm
            label="Registrar entrada — código de persona"
            placeholder="Escanea o escribe el código"
            buttonLabel="Registrar entrada"
            accent="active"
            onSubmit={handleEntry}
            submitting={entrySubmitting}
          />
        </div>
        <div className="ledger-card p-4">
          <CodeActionForm
            label="Registrar salida — código de persona"
            placeholder="Escanea o escribe el código"
            buttonLabel="Registrar salida"
            accent="closed"
            onSubmit={handleExit}
            submitting={exitSubmitting}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1 border-b border-paper-line mb-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3.5 py-2 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                tab === t.id
                  ? "border-ink text-ink"
                  : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {t.label}{" "}
              {t.id === "active" && !loading ? `(${active.length})` : ""}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-ink-soft">Cargando…</p>
        ) : list.length === 0 ? (
          <EmptyState
            title={
              tab === "active"
                ? "No hay visitas activas"
                : "Aún no hay visitas registradas"
            }
            description="Usa los campos de arriba para registrar una entrada."
          />
        ) : (
          <VisitTable visits={list} />
        )}
      </div>
    </div>
  );
}

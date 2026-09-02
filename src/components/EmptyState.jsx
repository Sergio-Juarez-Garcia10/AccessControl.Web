export default function EmptyState({ title, description }) {
  return (
    <div className="ledger-card border-dashed py-12 px-6 text-center">
      <p className="font-mono text-xs tracking-widest text-ink-soft uppercase mb-2">
        Sin registros
      </p>
      <h3 className="font-semibold text-ink mb-1">{title}</h3>
      {description && <p className="text-sm text-ink-soft">{description}</p>}
    </div>
  );
}

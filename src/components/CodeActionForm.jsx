import { useState } from "react";

export default function CodeActionForm({
  label,
  placeholder,
  buttonLabel,
  accent,
  onSubmit,
  submitting,
}) {
  const [code, setCode] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!code.trim()) return;
    onSubmit(code.trim());
    setCode("");
  }

  const accentClasses =
    accent === "active"
      ? "focus:border-stamp-active focus:ring-stamp-active"
      : "focus:border-stamp-rust focus:ring-stamp-rust";

  const buttonClasses =
    accent === "active"
      ? "bg-stamp-active hover:opacity-90 text-white"
      : "bg-stamp-rust hover:opacity-90 text-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="field-label">{label}</label>
        <input
          className={`field-input font-mono text-lg tracking-wide py-3.5 ${accentClasses}`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          inputMode="text"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className={`btn ${buttonClasses} w-full py-3.5 text-base`}
      >
        {submitting ? "Procesando…" : buttonLabel}
      </button>
    </form>
  );
}

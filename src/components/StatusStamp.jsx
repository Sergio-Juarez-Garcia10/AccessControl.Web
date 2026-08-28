export default function StatusStamp({ active }) {
  return active ? (
    <span className="stamp-active">
      <span className="w-1.5 h-1.5 rounded-full bg-stamp-active" />
      Activa
    </span>
  ) : (
    <span className="stamp-closed">Finalizada</span>
  )
}

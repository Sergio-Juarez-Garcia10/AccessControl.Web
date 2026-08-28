import { useState } from 'react'

const EMPTY = { code: '', firstName: '', lastName: '', email: '', phoneNumber: '' }

export default function PersonForm({ initial, isEdit = false, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(() => ({ ...EMPTY, ...initial }))
  const [errors, setErrors] = useState({})

  function set(field, value) {
    setValues((v) => ({ ...v, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!isEdit) {
      if (values.code.trim().length < 3) next.code = 'Mínimo 3 caracteres'
      if (values.code.trim().length > 20) next.code = 'Máximo 20 caracteres'
    }
    if (values.firstName.trim().length < 2) next.firstName = 'Mínimo 2 caracteres'
    if (values.lastName.trim().length < 2) next.lastName = 'Mínimo 2 caracteres'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Correo inválido'
    if (values.phoneNumber.trim().length !== 10) next.phoneNumber = 'Debe tener 10 dígitos'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isEdit && (
        <div>
          <label className="field-label">Código</label>
          <input
            className="field-input font-mono"
            value={values.code}
            onChange={(e) => set('code', e.target.value)}
            placeholder="Ej. 12345678"
            autoFocus
          />
          {errors.code && <p className="text-xs text-stamp-alert mt-1">{errors.code}</p>}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="field-label">Nombre</label>
          <input
            className="field-input"
            value={values.firstName}
            onChange={(e) => set('firstName', e.target.value)}
          />
          {errors.firstName && <p className="text-xs text-stamp-alert mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="field-label">Apellido</label>
          <input className="field-input" value={values.lastName} onChange={(e) => set('lastName', e.target.value)} />
          {errors.lastName && <p className="text-xs text-stamp-alert mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="field-label">Correo electrónico</label>
        <input
          type="email"
          className="field-input"
          value={values.email}
          onChange={(e) => set('email', e.target.value)}
        />
        {errors.email && <p className="text-xs text-stamp-alert mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="field-label">Teléfono</label>
        <input
          className="field-input font-mono"
          value={values.phoneNumber}
          onChange={(e) => set('phoneNumber', e.target.value)}
          placeholder="10 dígitos"
        />
        {errors.phoneNumber && <p className="text-xs text-stamp-alert mt-1">{errors.phoneNumber}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={submitting} className="btn-primary flex-1">
          {submitting ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Registrar persona'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  )
}

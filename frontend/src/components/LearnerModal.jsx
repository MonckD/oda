import { useEffect, useState } from 'react'

const statutColors = {
  'En attente': 'bg-amber-50 text-amber-600',
  'En cours': 'bg-green-50 text-green-600',
  'Terminé': 'bg-blue-50 text-blue-600',
}

const inputClass =
  'w-full rounded-[10px] border border-line bg-light px-3 py-2 text-sm outline-none transition focus:border-primary focus:bg-white'

const infoFields = [
  ['identifiant', 'Identifiant'],
  ['nom', 'Nom'],
  ['prenom', 'Prénom'],
  ['email', 'Email'],
  ['telephone', 'Téléphone'],
  ['age', 'Âge'],
  ['ville', 'Ville'],
  ['sexe', 'Sexe'],
  ['niveau_etude', "Niveau d'étude"],
]

const formationFields = [
  ['formation', 'Formation'],
  ['cohorte', 'Cohorte'],
  ['statut', 'Statut'],
  ['date_inscription', "Date d'inscription"],
]

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('')
}

function FullName({ learner }) {
  return `${learner.prenom} ${learner.nom}`
}
const disabledFields = ['identifiant', 'date_inscription']
function InfoGrid({ data, editable, onChange }) {
  const render = (key, label, value, selectOptions) => (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#b8b8b8]">
        {label}
      </span>
      {editable ? (
        selectOptions ? (
          <select
            disabled={disabledFields.includes(key)}
  className={`${inputClass} ${
    disabledFields.includes(key)
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
      : ''
  }`}
          >
            {selectOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ) : (
         <input
  value={value || ''}
  onChange={(e) => onChange(key, e.target.value)}
  disabled={disabledFields.includes(key)}
  className={`${inputClass} ${
    disabledFields.includes(key)
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
      : ''
  }`}
/>
        )
      ) : (
        <span className="block text-[13px] font-bold">{value || '—'}</span>
      )}
    </label>
  )

  return (
   <div className="grid grid-cols-2 gap-x-4 gap-y-4">
  {infoFields.map(([key, label]) =>
    key === 'sexe'
      ? render(key, label, data[key], ['Masculin', 'Féminin'])
      : render(key, label, data[key])
  )}

  {formationFields.map(([key, label]) =>
    key === 'statut'
      ? render(key, label, data[key], ['En attente', 'En cours', 'Terminé'])
      : key === 'formation'
        ? render(key, label, data[key], ['Dev', 'Data', 'Securite', 'Autre']) 
        : render(key, label, data[key])
  )}
</div>
  )
}

export default function LearnerModal({ learner, onClose, onSave, onDelete }) {
  const [mode, setMode] = useState('view')
  const [confirm, setConfirm] = useState(false)
  const [form, setForm] = useState({ ...learner })

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const changeField = (key, value) => {
    setForm({ ...form, [key]: value })
  }

  const close = () => {
    setMode('view')
    setConfirm(false)
    setForm({ ...learner })
    onClose()
  }

  if (confirm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[4px]">
        <div className="w-full max-w-[420px] rounded-[20px] bg-white p-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2"
            >
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            </svg>
          </div>
          <h3 className="mt-4 text-center font-heading text-lg font-bold">
            Supprimer cet apprenant ?
          </h3>
          <p className="mt-2 text-center text-sm text-[#666]">
            Voulez-vous vraiment supprimer <strong>{FullName({ learner })}</strong> ? Cette action
            est irréversible.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={close}
              className="flex-1 rounded-[10px] bg-light py-2.5 font-heading font-semibold text-ink transition hover:bg-line"
            >
              Annuler
            </button>
            <button
              onClick={() => onDelete(learner.id)}
              className="flex-1 rounded-[10px] bg-red-600 py-2.5 font-heading font-semibold text-white transition hover:bg-red-700"
            >
              Supprimer définitivement
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[4px]"
      onClick={close}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-[560px] flex-col rounded-[20px] bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-line p-5">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-primary font-heading font-bold text-white">
            {initials(FullName({ learner }))}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-heading font-bold">{FullName({ learner })}</div>
            <div className="text-xs text-[#888] select-none cursor-not-allowed">
              {learner.identifiant} · {learner.email}
            </div>
          </div>
          <button
            onClick={close}
            className="rounded-full p-2 text-[#888] transition hover:bg-light hover:text-ink"
            aria-label="Fermer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="shrink-0 border-b border-line p-5">
          <div className="flex gap-2">
            <button
              onClick={() => setMode('view')}
              className={`flex-1 rounded-[10px] py-2 text-sm font-semibold transition ${
                mode === 'view' ? 'bg-primary text-white' : 'bg-light text-ink hover:bg-line'
              }`}
            >
             Consulter
            </button>
            <button
              onClick={() => setMode('edit')}
              className={`flex-1 rounded-[10px] py-2 text-sm font-semibold transition ${
                mode === 'edit' ? 'bg-primary text-white' : 'bg-light text-ink hover:bg-line'
              }`}
            >
              Modifier
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <div className="mb-4">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                statutColors[form.statut] || 'bg-gray-100 text-gray-600'
              }`}
            >
              {form.statut}
            </span>
          </div>
          <InfoGrid data={form} editable={mode === 'edit'} onChange={changeField} />
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line p-5">
          <button
            onClick={() => setConfirm(true)}
            className="rounded-[10px] bg-[#FEF2F2] px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Supprimer
          </button>
          <div className="flex gap-3">
            <button
              onClick={close}
              className="rounded-[10px] bg-light px-5 py-2.5 font-heading font-semibold text-ink transition hover:bg-line"
            >
              Fermer
            </button>
            {mode === 'edit' && (
              <button
               onClick={async () => {
  try {
    await onSave({ ...form, id: learner.id })
    onClose()
  } catch (e) {
    console.error(e)
  }
}}
                className="rounded-[10px] bg-primary px-5 py-2.5 font-heading font-semibold text-white transition hover:bg-primary-dark"
              >
                Enregistrer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
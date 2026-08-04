import { useState } from 'react'

const emptyForm = {
  identifiant: '',
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  age: '',
  ville: '',
  sexe: '',
  niveau_etude: '',
  formation: '',
  cohorte: '8',
  statut: 'En cours',
  dateInscription: new Date().toISOString().slice(0, 10),
}

const inputClass =
  'w-full rounded-[10px] border border-line bg-light px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(245,93,0,0.08)]'

function SectionLabel({ children }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="h-5 w-[3px] rounded bg-primary" />
      <span className="font-heading text-sm font-semibold">{children}</span>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-[#666]">{label}</span>
      {children}
    </label>
  )
}

export default function CreateLearner({ onCreated, onDone }) {
  const [form, setForm] = useState(emptyForm)
  const [success, setSuccess] = useState(false)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const reset = () => {
    setForm(emptyForm)
    setSuccess(false)
  }
  const [error, setError] = useState('')

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    setError('')
    setSuccess(false)

    const res = await fetch('http://localhost:3000/api/learner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        telephone: form.telephone,
        sexe: form.sexe,
        age: form.age,
        ville: form.ville,
        niveau_etude: form.niveauEtude,
        formation: form.formation,
        cohorte: form.cohorte,
        statut: form.statut,
      }),
    })
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Erreur lors de la création')
    }

    setSuccess(true)

    setTimeout(() => {
      reset()
      if (onDone) onDone()
    }, 1400)

  } catch (err) {
    setError(err.message )
    console.log(err)
  }
}

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0">
        <h1 className="font-heading text-[22px] font-bold">Créer un apprenant</h1>
        <p className="mt-1 text-sm text-[#888]">
          Renseignez les informations personnelles et de formation de l'apprenant.
        </p>
      </div>

      <div className="mt-5 min-h-0 flex-1 overflow-y-auto pb-6">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[640px] rounded-2xl border border-line bg-white p-6"
        >
          <SectionLabel>Informations personnelles</SectionLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
           {}
            <Field label="Nom">
              <input value={form.nom} onChange={set('nom')} required className={inputClass} />
            </Field>
            <Field label="Prénom">
              <input value={form.prenom} onChange={set('prenom')} required className={inputClass} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  required
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Téléphone">
              <input value={form.telephone} onChange={set('telephone')} className={inputClass} />
            </Field>
            <Field label="Âge">
              <input type="number" value={form.age} onChange={set('age')} className={inputClass} />
            </Field>
            <Field label="Ville">
              <input value={form.ville} onChange={set('ville')} className={inputClass} />
            </Field>
            <Field label="Sexe">
              <select value={form.sexe} onChange={set('sexe')} className={inputClass}>
                <option value="">—</option>
                <option>Homme</option>
                <option>Femme</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Niveau d'étude">
                <select value={form.niveauEtude} onChange={set('niveauEtude')} className={inputClass}>
                  <option value="">—</option>
                  <option>Bac</option>
                  <option>Bac+2</option>
                  <option>Licence</option>
                  <option>Master</option>
                  <option>Doctorat</option>
                </select>
              </Field>
            </div>
          </div>

          <div className="my-6 border-t border-[#f0f0f0]" />

          <SectionLabel>Informations de formation</SectionLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Formation">
                <select value={form.formation} onChange={set('formation')} required className={inputClass}>
                  <option value="">—</option>
                  <option>Dev</option>
                  <option>Data</option>
                  <option>Securite</option>
                </select>
              </Field>
            </div>
            <Field label="Cohorte">
              <input value={form.cohorte} onChange={set('cohorte')} className={inputClass} />
            </Field>
            <Field label="Statut">
              <select value={form.statut} onChange={set('statut')} className={inputClass}>
                <option>En attente</option>
                <option>En cours</option>
                <option>Terminé</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Date d'inscription">
                <input
                  type="date"
                  value={form.dateInscription}
                  onChange={set('dateInscription')}
                  className={inputClass}
                />
              </Field>
            </div>
          </div>
          {error && (
  <div className="mb-4 text-sm text-red-500 font-semibold">
    {error}
  </div>
)}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="rounded-[10px] bg-light px-6 py-3 font-heading font-semibold text-ink transition hover:bg-line"
            >
              Réinitialiser
            </button>
            <button
              type="submit"
              className={`flex-1 rounded-[10px] py-3 font-heading font-semibold text-white transition ${
                success ? 'bg-green-500' : 'bg-primary hover:bg-primary-dark'
              }`}
            >
              {success ? '✓ Créé avec succès' : 'Créer l’apprenant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

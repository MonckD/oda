import { useMemo, useState, useEffect } from 'react'
import LearnerModal from './LearnerModal'
import { useNavigate, useSearchParams, Outlet } from "react-router-dom"

const statCards = [
  { label: 'Total', key: 'total', color: 'bg-primary' },
  { label: 'En cours', key: 'En cours', color: 'bg-green-500' },
  { label: 'En attente', key: 'En attente', color: 'bg-amber-500' },
  { label: 'Terminés', key: 'Terminé', color: 'bg-blue-500' },
]

const formationColors = {
  Dev: 'bg-blue-50 text-blue-600',
  Data: 'bg-violet-50 text-violet-600',
  Securite: 'bg-primary-soft text-primary',
}

const statutColors = {
  'En attente': 'bg-amber-50 text-amber-600',
  'En cours': 'bg-green-50 text-green-600',
  'Terminé': 'bg-blue-50 text-blue-600',
}

const API_BASE = 'http://localhost:3000'

export default function LearnerList() {
  const [learners, setLearners] = useState([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()


  const search = searchParams.get('q') || ''

  const setSearch = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) {
        next.set('q', value)
      } else {
        next.delete('q')
      }
      return next
    })
  }

  const fetchAllLearners = async () => {
    const res = await fetch(`${API_BASE}/api/learners`)
    const data = await res.json()
    return data.learner || []
  }

  useEffect(() => {
    const load = async () => {
      try {
        setLearners(await fetchAllLearners())
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

 
  useEffect(() => {
    const q = search.trim()

    if (!q) {

      fetchAllLearners()
        .then(setLearners)
        .catch((error) => console.error(error))
      return
    }

    const timeout = setTimeout(async () => {
      setSearching(true)
      try {

        const params = new URLSearchParams({ nom: q, prenom: q, email: q })
        const res = await fetch(`${API_BASE}/api/search?${params.toString()}`)

        if (res.status === 404) {
          setLearners([])
          return
        }
        if (!res.ok) throw new Error('Erreur recherche')

        const data = await res.json()
        setLearners(Array.isArray(data) ? data : data.learner || [])
      } catch (error) {
        console.error(error)
      } finally {
        setSearching(false)
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [search])

  const onSave = async (data) => {
    const res = await fetch(`${API_BASE}/api/learner/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('Erreur modification')

    const updated = await res.json()
    setLearners((prev) =>
      prev.map((l) => ((l.id || l._id) === (updated.id || updated._id) ? updated : l))
    )
  }

  const onDelete = async (id) => {
    const res = await fetch(`${API_BASE}/api/learner/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Erreur suppression')

    setLearners((prev) => prev.filter((l) => l.id !== id))
  }

  const counts = useMemo(() => {
    return {
      total: learners.length,
      'En cours': learners.filter((l) => l.statut === 'En cours').length,
      'En attente': learners.filter((l) => l.statut === 'En attente').length,
      'Terminé': learners.filter((l) => l.statut === 'Terminé').length,
    }
  }, [learners])

  if (loading) {
    return <p className="p-4">Chargement...</p>
  }

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="shrink-0">
          <h1 className="font-heading text-[22px] font-bold">Liste des apprenants</h1>
          <p className="mt-1 text-sm text-[#888]">
            {learners.length} apprenant{learners.length > 1 ? 's' : ''} inscrit
            {learners.length > 1 ? 's' : ''}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-4 xl:grid-cols-4">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="flex items-center gap-4 rounded-2xl border border-line p-4"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-[28px] font-bold leading-none">
                    {counts[card.key]}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#888]">
                    {card.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-5">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#888]"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom, prénom ou email..."
              className="w-full rounded-[10px] border border-line bg-light py-3 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(245,93,0,0.08)]"
            />
            {searching && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#888]">
                Recherche...
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto rounded-2xl border border-line">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="sticky top-0 z-10 bg-[#fafafa]">
              <tr className="text-[11px] uppercase tracking-wider text-[#888]">
                <th className="px-4 py-3 font-semibold">Identifiant</th>
                <th className="px-4 py-3 font-semibold">Nom</th>
                <th className="px-4 py-3 font-semibold">Prénom</th>
                <th className="px-4 py-3 font-semibold">Formation</th>
                <th className="px-4 py-3 font-semibold">Cohorte</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {learners.map((l) => (
                <tr key={l.id || l._id} className="border-t border-line transition hover:bg-[#fffbf8]">
                  <td className="px-4 py-3 font-mono text-[13px] text-[#888]">{l.identifiant}</td>
                  <td className="px-4 py-3 font-semibold">{l.nom}</td>
                  <td className="px-4 py-3">{l.prenom}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${formationColors[l.formation] || 'bg-gray-100 text-gray-600'}`}>
                      {l.formation}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
                      {l.cohorte}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statutColors[l.statut] || 'bg-gray-100 text-gray-600'}`}>
                      {l.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/dashboard/list/${l.id}`)}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-dark"
                    >
                      Voir
                    </button>
                  </td>
                </tr>
              ))}

              {learners.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-10 text-center text-[#888]">
                    Aucun apprenant trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Outlet context={{ onSave, onDelete }} />
    </>
  )
}

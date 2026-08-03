const BASE = '/api'

async function request(url, options = {}) {
  const res = await fetch(BASE + url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (res.status === 204) return null
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(data?.message || 'Erreur serveur')
  }
  return data
}

const toApi = (l) => ({
  nom: l.nom,
  prenom: l.prenom,
  email: l.email,
  telephone: l.telephone,
  age: l.age,
  ville: l.ville,
  sexe: l.sexe,
  niveau_etude: l.niveauEtude,
  formation: l.formation,
  cohorte: l.cohorte,
  statut: l.statut,
  identifiant: l.identifiant,
  date_inscription: l.dateInscription,
})

const fromApi = (l) => ({
  id: l.id,
  identifiant: l.identifiant,
  nom: l.nom,
  prenom: l.prenom,
  email: l.email,
  telephone: l.telephone,
  age: l.age != null ? String(l.age) : '',
  ville: l.ville,
  sexe: l.sexe,
  niveauEtude: l.niveau_etude,
  formation: l.formation,
  cohorte: l.cohorte,
  statut: l.statut,
  dateInscription: l.date_inscription ? String(l.date_inscription).slice(0, 10) : '',
})

export const login = async (email, motDePasse) => {
  const data = await request('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, motDePasse }),
  })
  return data.data
}

export const getLearners = async () => {
  const data = await request('/learners')
  return (data?.learner || []).map(fromApi)
}

export const getLearner = async (id) => {
  const learner = await request(`/learner/${id}`)
  return fromApi(learner)
}

export const createLearner = async (learner) => {
  const data = await request('/learner', {
    method: 'POST',
    body: JSON.stringify(toApi(learner)),
  })
  return fromApi(data.learner || data)
}

export const updateLearner = async (id, learner) => {
  const updated = await request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(toApi(learner)),
  })
  return fromApi(updated)
}

export const deleteLearner = (id) =>
  request(`/${id}`, { method: 'DELETE' })

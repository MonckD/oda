import { useEffect, useState } from 'react'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import LearnerList from './components/LearnerList'
import CreateLearner from './components/CreateLearner'
import LearnerModal from './components/LearnerModal'
import { mockLearners } from './data/mockLearners'
import * as api from './api'

export default function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('list')
  const [learners, setLearners] = useState([])
  const [online, setOnline] = useState(false)
  const [modalLearner, setModalLearner] = useState(null)

  useEffect(() => {
    if (!user) return
    ;(async () => {
      try {
        const data = await api.getLearners()
        setLearners(data)
        setOnline(true)
      } catch {
        setLearners(mockLearners)
        setOnline(false)
      }
    })()
  }, [user])

  const handleLogin = (user) => setUser(user)
  const handleLogout = () => setUser(null)

  const addLearner = async (learner) => {
    if (online) {
      try {
        const created = await api.createLearner(learner)
        setLearners((prev) => [created, ...prev])
        return
      } catch {
        /* repli local */
      }
    }
    const id = learners.length ? Math.max(...learners.map((l) => l.id)) + 1 : 1
    setLearners((prev) => [{ ...learner, id }, ...prev])
  }

  const updateLearner = async (learner) => {
    if (online) {
      try {
        const updated = await api.updateLearner(learner.id, learner)
        setLearners((prev) => prev.map((l) => (l.id === learner.id ? updated : l)))
        setModalLearner(null)
        return
      } catch {
        /* repli local */
      }
    }
    setLearners((prev) => prev.map((l) => (l.id === learner.id ? learner : l)))
    setModalLearner(null)
  }

  const deleteLearner = async (id) => {
    if (online) {
      try {
        await api.deleteLearner(id)
      } catch {
        /* repli local */
      }
    }
    setLearners((prev) => prev.filter((l) => l.id !== id))
    setModalLearner(null)
  }

  if (!user) return <LoginPage onLogin={handleLogin} />

  return (
    <>
      <Dashboard user={user} page={page} onPageChange={setPage} onLogout={handleLogout}>
        {page === 'create' ? (
          <CreateLearner onCreated={addLearner} onDone={() => setPage('list')} />
        ) : (
          <LearnerList learners={learners} onOpenLearner={setModalLearner} />
        )}
      </Dashboard>

      {modalLearner && (
        <LearnerModal
          learner={modalLearner}
          onClose={() => setModalLearner(null)}
          onSave={updateLearner}
          onDelete={deleteLearner}
        />
      )}
    </>
  )
}

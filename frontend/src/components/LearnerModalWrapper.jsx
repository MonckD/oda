import { useParams, useNavigate, useOutletContext, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import LearnerModal from "./LearnerModal"

export default function LearnerModalWrapper() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { onSave, onDelete } = useOutletContext()
  const [searchParams, setSearchParams] = useSearchParams()

  const [learner, setLearner] = useState(null)

  const rawMode = searchParams.get('mode')
  const mode = rawMode === 'edit' || rawMode === 'delete' ? rawMode : 'view'

  const setMode = (newMode) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (newMode === 'view') {
        next.delete('mode')
      } else {
        next.set('mode', newMode)
      }
      return next
    })
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/learner/${id}`)
      .then(res => res.json())
      .then(data => {
        setLearner(data)
      })
  }, [id])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {!learner ? (
        <div className="bg-white p-6 rounded-xl">
          Chargement...
        </div>
      ) : (
        <LearnerModal
          learner={learner}
          mode={mode}
          setMode={setMode}
          onClose={() => navigate("/dashboard/list")}
          onSave={onSave}
          onDelete={onDelete}
        />
      )}
    </div>
  )
}
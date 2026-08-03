import { useParams, useNavigate, useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import LearnerModal from "./LearnerModal"

export default function LearnerModalWrapper() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { onSave, onDelete } = useOutletContext() // ✅ ICI

  const [learner, setLearner] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:7000/api/learner/${id}`)
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
          onClose={() => navigate("/dashboard/list")}
          onSave={onSave}     
          onDelete={onDelete} 
        />
      )}
    </div>
  )
}
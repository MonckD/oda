import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

export default function LoginPage() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)
const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  try {
    const res = await fetch('http://localhost:7000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, motDePasse: password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message)
    }

    console.log('Connexion réussie:', data)

   
    localStorage.setItem('admin', JSON.stringify(data.user || data))

    navigate('/dashboard/list')
  } catch (err) {
    setError(err.message || 'Erreur lors de la connexion')
  } finally {
    setLoading(false)
  }
}

return ( <div className="flex min-h-screen"> <div className="hidden flex-1 flex-col justify-between bg-primary p-10 lg:flex"> <div className="flex items-center gap-3"> <Logo /> <span className="font-heading text-lg font-semibold text-white">
Orange Digital Center </span> </div>

    <div>
      <h1 className="font-heading text-4xl font-bold text-white">
        Gérez vos apprenants en toute simplicité
      </h1>
      <p className="mt-4 max-w-md text-white/75">
        Suivez les formations, les cohortes et le parcours de chaque apprenant
        de l'Orange Digital Center.
      </p>
    </div>
  </div>

  <div className="flex flex-1 items-center justify-center bg-white p-6">
    <div className="w-full max-w-sm">
      <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
        <Logo className="h-10 w-10" />
      </div>

      <h2 className="mb-6 text-center font-heading text-2xl font-bold lg:text-left">
        Connexion
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <label className="mb-1.5 block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@odc.example"
          className="w-full rounded-[10px] border border-line bg-light px-4 py-3 outline-none"
        />

        <label className="mb-1.5 mt-4 block text-sm font-medium">
          Mot de passe
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-[10px] border border-line bg-light px-4 py-3 outline-none"
        />

        {error && (
          <p className="mt-3 text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-[10px] bg-primary py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  </div>
</div>
)
}


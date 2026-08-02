import { useState } from 'react'
import { login } from '../api'
import Logo from './Logo'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const next = { email: '', password: '' }
    if (!email.trim()) next.email = 'L’email est requis.'
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = 'Adresse email invalide.'
    if (!password) next.password = 'Le mot de passe est requis.'
    else if (password.length < 4) next.password = 'Minimum 4 caractères.'
    setErrors(next)
    return !next.email && !next.password
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setApiError('')
    try {
      const admin = await login(email, password)
      onLogin({
        name: `${admin.prenom} ${admin.nom}`.trim(),
        email: admin.email,
      })
    } catch (err) {
      setApiError(err.message || 'Email ou mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-primary p-10 lg:flex">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-heading text-lg font-semibold text-white">
            Orange Digital Center
          </span>
        </div>
        <div>
          <h1 className="font-heading text-4xl font-bold text-white">
            Gérez vos apprenants en toute simplicité
          </h1>
          <p className="mt-4 max-w-md text-white/75">
            Suivez les formations, les cohortes et le parcours de chaque apprenant
            de l'Orange Digital Center.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white font-heading font-bold text-primary">
            AD
          </div>
          <div>
            <div className="font-medium text-white">Aminata Diallo</div>
            <div className="text-sm text-white/75">Responsable de formation</div>
          </div>
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
              className="w-full rounded-[10px] border border-line bg-light px-4 py-3 outline-none transition focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(245,93,0,0.1)]"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}

            <label className="mb-1.5 mt-4 block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-[10px] border border-line bg-light px-4 py-3 outline-none transition focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(245,93,0,0.1)]"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            {apiError && <p className="mt-3 text-sm text-red-500">{apiError}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-[10px] bg-primary py-3 font-heading font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import Logo from './Logo'

const NAV_ITEMS = [
  { id: 'list', label: 'Liste des apprenants', icon: 'M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z' },
  { id: 'create', label: 'Créer un apprenant', icon: 'M12 5v14M5 12h14' },
]

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('')
}

export default function Dashboard({ user, page, onPageChange, onLogout, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed left-0 right-0 top-0 z-50 flex h-[60px] items-center justify-between bg-ink px-4">
        <div className="flex items-center gap-2">
          <button
            className="rounded p-1 text-white lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Logo className="h-8 w-8" />
          <span className="hidden font-heading text-[15px] text-[#ccc] sm:block">
            Orange Digital Center
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white">
            {initials(user.name)}
          </div>
          <span className="hidden text-sm font-medium text-white md:block">{user.name}</span>
          <span className="hidden h-6 w-px bg-[#333] md:block" />
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#ccc] transition hover:bg-[#2a2a2a] hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition lg:hidden ${open ? 'visible' : 'invisible'}`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed bottom-0 left-0 top-[60px] z-40 w-[220px] overflow-y-auto border-r border-line bg-white transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <p className="px-4 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-wider text-[#bbb]">
          Navigation
        </p>
        <nav className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const active = page === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  active
                    ? 'bg-primary-soft font-semibold text-primary'
                    : 'text-ink hover:bg-hover-soft'
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d={item.icon} />
                </svg>
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>

      <main
        className="ml-0 overflow-y-auto bg-white p-7 transition-all lg:ml-[220px]"
        style={{ marginTop: 60, height: 'calc(100vh - 60px)' }}
      >
        {children}
      </main>
    </div>
  )
}

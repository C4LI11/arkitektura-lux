import PageShell from '../components/PageShell.jsx'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-24">
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.35em] text-white/55">404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white/95">
            Page not found
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            The route doesn’t exist yet — this is a clean SPA shell.
          </p>
          <Link
            className="mt-8 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm tracking-widest text-white hover:bg-white/10 hover:border-white/25 transition"
            to="/"
          >
            GO HOME
          </Link>
        </div>
      </div>
    </PageShell>
  )
}


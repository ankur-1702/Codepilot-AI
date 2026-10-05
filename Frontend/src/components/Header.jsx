import { LogoIcon } from './Icons.jsx'

// The centered brand lockup. The pill on the right appears only while a review
// is streaming or after it fails, so the header never advertises a resting state.
function Header({ isLoading, error }) {
  const status = error
    ? { label: 'Stream interrupted', dot: 'bg-danger' }
    : isLoading
      ? { label: 'Reviewing', dot: 'bg-accent' }
      : null

  return (
    <header className="relative z-10 flex shrink-0 justify-center px-6 pt-5 pb-4">
      <div className="flex items-center gap-3.5">
        <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-deep via-accent to-sky-300 shadow-[0_10px_30px_-10px] shadow-accent/70 ring-1 ring-white/20">
          <LogoIcon className="h-[18px] w-[18px]" />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(60%_50%_at_30%_0%,rgba(255,255,255,0.45),transparent_70%)]" />
        </span>

        <div className="leading-none">
          <h1 className="brand-gradient text-[26px] font-bold tracking-tight">Codepilot</h1>
          <p className="mt-1.5 text-[11px] font-medium tracking-[0.22em] text-white/40 uppercase">
            AI code review
          </p>
        </div>
      </div>

      {status && (
        <div className="absolute top-1/2 right-6 flex -translate-y-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pr-3.5 pl-3 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            {isLoading && !error && (
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${status.dot}`} />
            )}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${status.dot}`} />
          </span>
          <span className="text-xs font-medium text-white/65">{status.label}</span>
        </div>
      )}
    </header>
  )
}

export default Header
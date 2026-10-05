// Pure decoration behind the whole app: a drifting accent bloom over a faint
// blueprint grid. It never takes pointer events, so the UI stays clickable.
function AmbientBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="animate-drift absolute -top-56 left-1/2 h-[30rem] w-[54rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.28),transparent)] blur-3xl" />
      <div className="absolute -right-40 bottom-[-14rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.16),transparent)] blur-3xl" />
      <div className="bg-grid bg-grid-fade absolute inset-0" />
    </div>
  )
}

export default AmbientBackdrop
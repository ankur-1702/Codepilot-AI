import { ChatIcon } from './Icons.jsx'

// One badge style per live state. Idle and finished reviews get no badge at all,
// so the bar only speaks up while something is happening.
const STATE_STYLES = {
  streaming: 'border-accent/30 bg-accent/12 text-accent-soft',
  error: 'border-danger/30 bg-danger/12 text-danger',
}

// The fixed title bar at the top of the review pane.
function ReviewPaneHeader({ state }) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/8 px-5 py-3">
      <div className="flex items-center gap-2.5">
        <span className="grid h-6 w-6 place-items-center rounded-md border border-white/10 bg-white/5">
          <ChatIcon className="h-3.5 w-3.5 text-accent" />
        </span>
        <h2 className="text-sm font-semibold tracking-tight text-white/85">Review</h2>
      </div>

      {state && (
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors ${STATE_STYLES[state]}`}
        >
          {state}
        </span>
      )}
    </div>
  )
}

export default ReviewPaneHeader
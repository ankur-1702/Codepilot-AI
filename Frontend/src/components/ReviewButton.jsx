import { ArrowIcon, StopIcon } from './Icons.jsx'

// The idle button is the accent gradient, so it reads as the primary action;
// while a review streams it turns into a quiet glass "Stop" so it never competes
// with the response being written.
const IDLE_BUTTON =
  'border-0 bg-gradient-to-br from-white via-accent-soft to-accent text-[#14121f] shadow-[0_14px_40px_-14px] shadow-accent/80 hover:from-accent-soft hover:to-accent-deep hover:shadow-[0_18px_50px_-14px] hover:shadow-accent'

const STOP_BUTTON =
  'border border-white/15 bg-white/10 text-white/90 shadow-lift backdrop-blur-md hover:bg-white/15'

// Sits on top of the editor. It starts a review, or stops the running one.
function ReviewButton({ isLoading, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLoading ? 'Stop review' : 'Review code'}
      className={`absolute right-5 bottom-5 flex cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:translate-y-px ${
        isLoading ? STOP_BUTTON : IDLE_BUTTON
      }`}
    >
      {isLoading ? (
        <>
          <StopIcon className="h-3 w-3" />
          Stop
        </>
      ) : (
        <>
          <ArrowIcon className="h-4 w-4" />
          Review
        </>
      )}
    </button>
  )
}

export default ReviewButton
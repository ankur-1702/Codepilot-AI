import { useStickToBottom } from '../hooks/useStickToBottom.js'
import ReviewPaneHeader from './ReviewPaneHeader.jsx'
import ReviewResult from './ReviewResult.jsx'

// The right-hand panel. It scrolls to the bottom whenever new text arrives, so
// the user always watches the newest line of the review being written.
function ReviewPane({ review, error, isLoading }) {
  const paneRef = useStickToBottom(review)
  const state = error ? 'error' : isLoading ? 'streaming' : null

  return (
    <section className="flex h-full basis-1/2 min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/80 shadow-panel backdrop-blur-sm">
      <ReviewPaneHeader state={state} />

      <div ref={paneRef} className="scroll-slim min-h-0 flex-1 overflow-auto px-6 py-5">
        <ReviewResult review={review} error={error} isLoading={isLoading} />
      </div>
    </section>
  )
}

export default ReviewPane
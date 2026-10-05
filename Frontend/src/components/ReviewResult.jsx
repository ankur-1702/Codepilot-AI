import ReviewEmptyState from './ReviewEmptyState.jsx'
import ReviewError from './ReviewError.jsx'
import ReviewMarkdown from './ReviewMarkdown.jsx'
import ThinkingIndicator from './ThinkingIndicator.jsx'

// Chooses what the review pane shows: an error banner (which sits above the
// body rather than replacing it), then the streaming text or, before the first
// token lands, the waiting indicator.
function ReviewResult({ review, error, isLoading }) {
  return (
    <>
      {error ? <ReviewError message={error} /> : null}

      {review ? (
        <ReviewMarkdown review={review} isLoading={isLoading} />
      ) : isLoading ? (
        <ThinkingIndicator />
      ) : (
        <ReviewEmptyState />
      )}
    </>
  )
}

export default ReviewResult
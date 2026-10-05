import { SparkleIcon } from './Icons.jsx'

// The prompt shown before a review has ever been requested.
function ReviewEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.02] p-6">
      <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-accent/25 to-sky-300/10 text-accent-soft">
        <SparkleIcon className="h-4.5 w-4.5" />
      </span>

      <p className="mt-4 text-sm font-semibold text-white/85">Review your code</p>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/45">
        Add code in the editor and select{' '}
        <span className="font-medium text-white/70">Review</span>. The feedback will
        appear here as it is generated.
      </p>
    </div>
  )
}

export default ReviewEmptyState
import { AlertIcon } from './Icons.jsx'

// The banner shown above the review text when the stream fails or times out.
function ReviewError({ message }) {
  return (
    <div role="alert" className="mb-5 flex gap-3 rounded-xl border border-danger/25 bg-danger/[0.07] p-4">
      <AlertIcon className="mt-px h-4 w-4 shrink-0 text-danger" />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-danger">Stream interrupted</p>
        <p className="mt-1 text-sm leading-relaxed break-words text-white/60">{message}</p>
      </div>
    </div>
  )
}

export default ReviewError
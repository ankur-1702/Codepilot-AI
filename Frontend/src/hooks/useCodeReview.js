import { useState } from 'react'
import { useReviewStream } from './useReviewStream.js'

const STARTER_CODE = 'function sum() {\n  return 1 + 1\n}'

// The one place where the editor text and the review request meet. App.jsx just
// reads the values it returns and passes them down.
export function useCodeReview() {
  const [code, setCode] = useState(STARTER_CODE)
  const { review, error, isLoading, start, cancel } = useReviewStream()

  // One button drives both directions: start a review, or stop the running one.
  function toggleReview() {
    if (isLoading) {
      cancel()
      return
    }

    start(code)
  }

  return { code, setCode, review, error, isLoading, toggleReview }
}
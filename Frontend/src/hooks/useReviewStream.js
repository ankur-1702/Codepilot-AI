import { useEffect, useRef, useState } from 'react'
import { readEventStream } from '../lib/sse.js'

const REQUEST_TIMEOUT_MS = 90_000
const TIMEOUT_MESSAGE = 'The review took too long. Please try again.'
const API_URL = `${(import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/$/, '')}/ai/get-review/stream`

// Keeps review text and request state out of the UI components.
export function useReviewStream() {
  const [review, setReview] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const activeRequest = useRef(null)

  async function startReview(code) {
    // Stop the previous request before starting another one.
    activeRequest.current?.abort()

    const controller = new AbortController()
    activeRequest.current = controller
    let timedOut = false

    const timeoutId = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, REQUEST_TIMEOUT_MS)

    setReview('')
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error((await response.text()) || 'The review request failed.')
      }
      if (!response.body) {
        throw new Error('This browser cannot read streamed responses.')
      }

      await readEventStream(response.body, (event) => {
        // Ignore any late events from a request that has since been replaced.
        if (activeRequest.current !== controller) return

        if (event.type === 'delta') {
          setReview((currentReview) => currentReview + event.text)
        }
        if (event.type === 'error') setError(event.message)
      })
    } catch (requestError) {
      // A normal abort means the user pressed Stop or started another review.
      if (activeRequest.current === controller) {
        if (timedOut) {
          setError(TIMEOUT_MESSAGE)
        } else if (!controller.signal.aborted) {
          setError(requestError.message || 'The review request failed.')
        }
      }
    } finally {
      clearTimeout(timeoutId)

      // An older request must not change the current request's loading state.
      if (activeRequest.current === controller) {
        activeRequest.current = null
        setIsLoading(false)
      }
    }
  }

  function cancelReview() {
    activeRequest.current?.abort()
  }

  // Stop network work when the component using this hook is removed.
  useEffect(() => () => activeRequest.current?.abort(), [])

  return {
    review,
    error,
    isLoading,
    start: startReview,
    cancel: cancelReview,
  }
}

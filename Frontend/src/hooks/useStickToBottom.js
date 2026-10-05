import { useEffect, useRef } from 'react'

// Pins a scrollable element to its bottom whenever `dependency` changes, so the
// newest line of a streaming review is always the one on screen.
export function useStickToBottom(dependency) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (element) element.scrollTop = element.scrollHeight
  }, [dependency])

  return ref
}
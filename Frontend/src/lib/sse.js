// The backend streams Server-Sent Events: one `data: {json}` block per event,
// separated by a blank line. This turns that text into parsed events.
function parseEvent(block) {
  const line = block.split('\n').find((part) => part.startsWith('data:'))
  if (!line) return null // a heartbeat such as ": ping" has no data line

  try {
    return JSON.parse(line.slice(5))
  } catch {
    return null
  }
}

export async function readEventStream(body, onEvent) {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) break

    // A network chunk can cut an event in half, so the unfinished tail stays
    // in `buffer` and is joined with the next chunk.
    buffer += decoder.decode(value, { stream: true })

    const blocks = buffer.split('\n\n')
    buffer = blocks.pop() // the last block is not terminated yet

    for (const block of blocks) {
      const event = parseEvent(block)
      if (event) onEvent(event)
    }
  }
}

import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

// Hoisted so the object is not rebuilt on every streamed chunk. Links open in a
// new tab, and wide tables scroll instead of stretching the pane.
const MARKDOWN_COMPONENTS = {
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="scroll-slim -mx-1 overflow-x-auto px-1">
      <table>{children}</table>
    </div>
  ),
}

// The streaming review body, with a blinking caret while more text is coming.
function ReviewMarkdown({ review, isLoading }) {
  return (
    <div className="review-prose">
      <Markdown rehypePlugins={[rehypeHighlight]} components={MARKDOWN_COMPONENTS}>
        {review}
      </Markdown>

      {isLoading ? (
        <span className="animate-caret ml-1 inline-block h-[1.05em] w-[3px] rounded-full bg-accent align-middle shadow-[0_0_14px_1px] shadow-accent/80" />
      ) : null}
    </div>
  )
}

export default ReviewMarkdown
import './syntax.css'
import AmbientBackdrop from './components/AmbientBackdrop.jsx'
import CodeEditor from './components/CodeEditor.jsx'
import Header from './components/Header.jsx'
import ReviewButton from './components/ReviewButton.jsx'
import ReviewPane from './components/ReviewPane.jsx'
import { useCodeReview } from './hooks/useCodeReview.js'

// All state lives in useCodeReview; this file only decides what goes on screen.
// Two panes: the code on the left, the streaming review on the right.
function App() {
  const { code, setCode, review, error, isLoading, toggleReview } = useCodeReview()

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-canvas font-sans text-white/90 antialiased">
      <AmbientBackdrop />
      <Header isLoading={isLoading} error={error} />

      <main className="relative z-10 flex min-h-0 w-full flex-1 gap-5 px-6 pb-6">
        <CodeEditor code={code} onChange={setCode}>
          <ReviewButton isLoading={isLoading} onClick={toggleReview} />
        </CodeEditor>

        <ReviewPane review={review} error={error} isLoading={isLoading} />
      </main>
    </div>
  )
}

export default App
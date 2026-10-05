import Editor from 'react-simple-code-editor'
import Prism from 'prismjs'

const LANGUAGE = 'javascript'

function highlight(value) {
  return Prism.highlight(value, Prism.languages[LANGUAGE], LANGUAGE)
}

// A syntax-highlighted code box. `children` is rendered on top of it, which is
// how the Review button gets positioned over the editor.
function CodeEditor({ code, onChange, children }) {
  return (
    <div className="relative h-full basis-1/2 min-w-0 rounded-2xl border border-white/10 bg-surface/80 shadow-panel backdrop-blur-sm">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-[radial-gradient(120%_120%_at_0%_0%,rgba(167,139,250,0.07),transparent_60%)]"
      />

      <div className="absolute inset-0 rounded-2xl bg-black/40">
        <div className="editor h-full w-full [&_pre]:pb-24!">
          <Editor
            value={code}
            onValueChange={onChange}
            highlight={highlight}
            padding={20}
            className="h-full w-full"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      {children}
    </div>
  )
}

export default CodeEditor
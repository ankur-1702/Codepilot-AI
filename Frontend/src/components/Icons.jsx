// The app's inline SVGs live here so the UI components hold only layout and
// logic. Every icon inherits `currentColor` and is hidden from screen readers;
// pass `className` to size and colour it.

// Shared stroke attributes for every icon below.
function Icon({ children, className = '', stroke = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

// The brand mark: angle brackets around a slash.
export function LogoIcon({ className }) {
  return (
    <Icon className={className} stroke="#0a0a0d" strokeWidth={2.1}>
      <path d="m8.5 8-4 4 4 4" />
      <path d="m15.5 8 4 4-4 4" />
      <path d="M13.8 5.5 10.2 18.5" />
    </Icon>
  )
}

// A speech bubble, used on the review pane title.
export function ChatIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Icon>
  )
}

// A right-pointing arrow, the "send" mark on the idle review button.
export function ArrowIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </Icon>
  )
}

// A filled square, the "stop" mark on the busy review button.
export function StopIcon({ className }) {
  return (
    <Icon className={className}>
      <rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor" stroke="none" />
    </Icon>
  )
}

// Sparkles for the pre-review prompt.
export function SparkleIcon({ className }) {
  return (
    <Icon className={className} strokeWidth={1.8}>
      <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M18.5 16.5 19 18l1.5.5L19 19l-.5 1.5L18 19l-1.5-.5L18 18z" />
    </Icon>
  )
}

// A warning sign for a stream that failed or timed out.
export function AlertIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4.5" />
      <path d="M12 16h.01" />
    </Icon>
  )
}
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Used in the log line to pinpoint where the boundary caught the error. */
  routeName?: string;
}

interface State {
  error: Error | null;
}

/**
 * Top-level safety net. Catches render-time exceptions (e.g. the
 * useContext-null crash that previously produced a blank screen) and shows a
 * branded fallback instead of an empty page. The full error + component stack
 * + current pathname are dumped to the console so the offending route /
 * component is obvious in dev tools and in production session replays.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const route = typeof window !== "undefined" ? window.location.pathname : "(ssr)";

    console.error(
      `[ErrorBoundary] crash at route="${route}" boundary="${this.props.routeName ?? "root"}"\n` +
        `${error.name}: ${error.message}\n` +
        `Component stack:${info.componentStack}`
    );
  }

  reset = () => {
    this.setState({ error: null });
    if (typeof window !== "undefined") window.location.assign("/");
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-500/15 text-orange-400 mb-5">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-white/60 text-sm mb-6">
            We hit an unexpected error rendering this page. The team has been notified.
          </p>
          <pre className="text-left text-xs font-mono bg-white/5 border border-white/10 rounded-lg p-3 overflow-auto max-h-40 mb-6">
            {this.state.error.message}
          </pre>
          <button
            onClick={this.reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors"
          >
            Return home
          </button>
        </div>
      </div>
    );
  }
}

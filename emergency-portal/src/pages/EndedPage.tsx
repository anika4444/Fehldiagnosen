import { TopBar } from "../components/TopBar";
import { useFocusOnMount } from "../hooks/useFocusOnMount";

type EndedPageProps = {
  title?: string;
  reason: string;
  actionLabel?: string;
  onRestart: () => void;
  // Shown for connection problems, where the session may still be valid
  onRetry?: () => void;
};

export function EndedPage({ title = "Zugriff beendet", reason, actionLabel = "Code erneut eingeben", onRestart, onRetry }: EndedPageProps) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>();

  return (
    <>
      <TopBar />
      <main className="page">
        <div className="stack center" style={{ paddingTop: 20 }}>
          <span className="badge-icon" style={{ background: "var(--line-soft)" }} aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
            </svg>
          </span>
          <h1 className="title" ref={headingRef} tabIndex={-1}>
            {title}
          </h1>
          <p className="lead" role="status">
            {reason}
          </p>
        </div>
        {onRetry && (
          <button type="button" className="btn btn-primary" onClick={onRetry}>
            Erneut versuchen
          </button>
        )}
        <button type="button" className={onRetry ? "btn btn-secondary" : "btn btn-primary"} onClick={onRestart}>
          {actionLabel}
        </button>
      </main>
    </>
  );
}

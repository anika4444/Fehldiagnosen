import { useEffect } from "react";

import { useCountdown } from "../hooks/useCountdown";
import { formatCountdown } from "../utils/format";

type SessionTimerProps = {
  secondsRemaining?: number | null;
  onExpired: () => void;
};

const WARNING_SECONDS = 120;

// Hard end of the session. There is no "extend" on purpose.
export function SessionTimer({ secondsRemaining, onExpired }: SessionTimerProps) {
  const secondsLeft = useCountdown(secondsRemaining);

  useEffect(() => {
    if (secondsLeft === 0) onExpired();
  }, [secondsLeft, onExpired]);

  if (secondsLeft == null) return null;

  return (
    <span className={secondsLeft <= WARNING_SECONDS ? "timer timer-low" : "timer"} role="timer" aria-live="off">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
      <span className="sr-only">Sitzung endet in</span>
      {formatCountdown(secondsLeft)}
    </span>
  );
}

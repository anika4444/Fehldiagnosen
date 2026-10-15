import { useEffect, useState } from "react";

// Counts down from the seconds the server reported. performance.now() is independent of the
// device clock, so a wrong time setting on the helper's phone cannot shorten or extend the session.
// Each new value from the server restarts the countdown, which keeps both sides in sync.
export function useCountdown(secondsRemaining?: number | null): number | null {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(secondsRemaining ?? null);

  useEffect(() => {
    if (secondsRemaining == null) {
      setSecondsLeft(null);
      return;
    }

    const deadline = performance.now() + secondsRemaining * 1000;
    const tick = () => setSecondsLeft(Math.max(0, Math.round((deadline - performance.now()) / 1000)));

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [secondsRemaining]);

  return secondsLeft;
}

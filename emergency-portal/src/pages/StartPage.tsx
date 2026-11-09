import { type FormEvent, useState } from "react";

import { TopBar } from "../components/TopBar";
import { useFocusOnMount } from "../hooks/useFocusOnMount";
import type { Credentials } from "../types/emergency";
import { formatPublicId } from "../utils/format";

type StartPageProps = {
  notice?: string | null;
  // Kept after a wrong PIN, so only the PIN has to be typed again
  initialPublicId?: string;
  onContinue: (credentials: Credentials) => void;
};

// Entry without QR code: emergency id plus PIN
export function StartPage({ notice, initialPublicId, onContinue }: StartPageProps) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>();
  const [publicId, setPublicId] = useState(() => formatPublicId(initialPublicId ?? ""));
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  // A new attempt replaces the message of the previous one
  const message = error ?? notice ?? null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanId = publicId.replace(/\s/g, "");

    if (cleanId.length !== 8) {
      setError("Die Notfall-ID hat 8 Zeichen.");
      return;
    }

    if (!/^\d{6}$/.test(pin)) {
      setError("Die PIN besteht aus 6 Ziffern.");
      return;
    }

    setError(null);
    onContinue({ kind: "pin", publicId: cleanId, pin });
  };

  return (
    <>
      <TopBar right={<span className="pill pill-neutral">Nur lesend</span>} />
      <main className="page">
        <div className="stack">
          <h1 className="title" ref={headingRef} tabIndex={-1}>
            Gesundheitsdaten im Notfall abrufen
          </h1>
          <p className="lead">
            Scannen Sie den QR-Code am Handy der Person mit der Kamera oder geben Sie Notfall-ID und PIN ein.
          </p>
        </div>

        <form className="card stack-l" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="public-id">Notfall-ID</label>
            <input
              id="public-id"
              className="input input-mono"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder="z. B. K7QM 4XT2"
              value={publicId}
              aria-invalid={Boolean(message)}
              aria-describedby={message ? "start-message" : undefined}
              onChange={(event) => setPublicId(formatPublicId(event.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="pin">PIN, 6 Ziffern</label>
            {/* Plain text field with hidden characters: a password field would make browsers offer to save the PIN */}
            <input
              id="pin"
              className="input input-mono input-secret"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="6 Ziffern"
              value={pin}
              aria-invalid={Boolean(message)}
              aria-describedby={message ? "start-message" : undefined}
              onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))}
            />
          </div>

          {message && (
            <p id="start-message" className="error" role="alert">
              {message}
            </p>
          )}

          <button type="submit" className="btn btn-primary">
            Weiter
          </button>

          <p className="small">Nach 5 falschen Eingaben wird diese Notfall-ID vorübergehend gesperrt.</p>
        </form>

        <footer className="footer">
          <p className="small">Jeder Zugriff wird protokolliert und der Person in ihrer ADAM App angezeigt.</p>
          <p style={{ fontWeight: 700, color: "var(--emergency)" }}>Akuter Notfall? Rettung 144, Euronotruf 112</p>
        </footer>
      </main>
    </>
  );
}

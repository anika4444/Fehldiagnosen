import { type FormEvent, useState } from "react";

import { TopBar } from "../components/TopBar";
import { useFocusOnMount } from "../hooks/useFocusOnMount";
import type { AccessorInfo } from "../types/emergency";

type ConsentPageProps = {
  viaQrCode: boolean;
  isSubmitting: boolean;
  error?: string | null;
  onConfirm: (accessor: AccessorInfo) => void;
  onCancel: () => void;
};

// Mandatory confirmation before any data is requested
export function ConsentPage({ viaQrCode, isSubmitting, error, onConfirm, onCancel }: ConsentPageProps) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>();
  const [consent, setConsent] = useState(false);
  const [accessorName, setAccessorName] = useState("");
  const [accessorInstitution, setAccessorInstitution] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consent) return;

    onConfirm({
      accessorName: accessorName.trim() || undefined,
      accessorInstitution: accessorInstitution.trim() || undefined,
    });
  };

  return (
    <>
      <TopBar right={viaQrCode ? <span className="pill pill-active">QR-Code erkannt</span> : undefined} />
      <main className="page">
        <div className="stack">
          <h1 className="title" ref={headingRef} tabIndex={-1}>
            Kurz bestätigen
          </h1>
          <p className="lead">Danach sehen Sie die freigegebenen Daten für eine begrenzte Zeit.</p>
        </div>

        <form className="card stack-l" onSubmit={handleSubmit}>
          <label className="consent" htmlFor="consent">
            <input id="consent" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
            <span>Ich greife im Rahmen einer Notfall- bzw. medizinischen Behandlung zu. Der Zugriff wird protokolliert.</span>
          </label>

          <div className="field">
            <label htmlFor="accessor-name">
              Name <span className="optional">(freiwillig)</span>
            </label>
            <input
              id="accessor-name"
              className="input"
              autoComplete="name"
              maxLength={100}
              placeholder="z. B. M. Huber"
              value={accessorName}
              onChange={(event) => setAccessorName(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="accessor-institution">
              Einrichtung <span className="optional">(freiwillig)</span>
            </label>
            <input
              id="accessor-institution"
              className="input"
              autoComplete="organization"
              maxLength={150}
              placeholder="z. B. Rettungsdienst Dornbirn"
              value={accessorInstitution}
              onChange={(event) => setAccessorInstitution(event.target.value)}
            />
          </div>

          <p className="small">Diese Angaben werden nicht überprüft und nur im Protokoll der Person gespeichert.</p>

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-primary" disabled={!consent || isSubmitting}>
            {isSubmitting ? "Wird geprüft..." : "Daten anzeigen"}
          </button>
        </form>

        <button type="button" className="btn-link" onClick={onCancel}>
          Abbrechen
        </button>
      </main>
    </>
  );
}

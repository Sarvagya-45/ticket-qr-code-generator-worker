import { useState } from "react";
import { generateTicketQr } from "./ticketApi";

function TicketGenerator() {
  const [ticketId, setTicketId] = useState("");
  const [error, setError] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  function isValidTicketId(value) {
    return /^TICKET-\d+$/.test(value.trim());
  }

  function logTelemetry() {
    console.log(
      "[Analytics] User interacted with Ticket QR Code Generator Worker",
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTicketId = ticketId.trim();

    if (!trimmedTicketId) {
      setError("Ticket ID is required");
      setQrCode("");
      return;
    }

    if (!isValidTicketId(trimmedTicketId)) {
      setError("Invalid Ticket ID");
      setQrCode("");
      return;
    }

    setError("");
    setQrCode("");
    setIsGenerating(true);

    try {
      const response = await generateTicketQr(trimmedTicketId);

      if (!response?.qrCode) {
        throw new Error("Invalid QR response");
      }

      setQrCode(response.qrCode);
    } catch (requestError) {
      if (requestError?.message === "Failed to fetch") {
        setError(
          "Unable to connect to the server. Check your connection and try again.",
        );
      } else {
        setError("Unable to generate QR code");
      }

      setQrCode("");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleInputChange(event) {
    logTelemetry();
    setTicketId(event.target.value);
    setError("");
    setQrCode("");
  }

  return (
    <section className="ticket-page" aria-labelledby="ticket-generator-title">
      <div className="ticket-shell">
        <header className="ticket-header">
          <div>
            <p className="eyebrow">FLOOR OPERATIONS</p>

            <h1 id="ticket-generator-title">Ticket QR Code Generator</h1>

            <p className="ticket-description">
              Enter a valid ticket ID to generate its QR code.
            </p>
          </div>

          <div className="worker-status" aria-label="Worker status">
            <span className="status-indicator" aria-hidden="true" />
            <span>Worker ready</span>
          </div>
        </header>

        <div className="ticket-content">
          <form className="ticket-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="ticket-id">Ticket ID</label>

              <input
                id="ticket-id"
                name="ticketId"
                type="text"
                value={ticketId}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="TICKET-12345"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "ticket-id-error" : "ticket-id-help"}
                disabled={isGenerating}
              />

              {error ? (
                <p id="ticket-id-error" className="field-error" role="alert">
                  {error}
                </p>
              ) : (
                <p id="ticket-id-help" className="field-help">
                  Use the Ticket ID shown on the ticket record.
                </p>
              )}
            </div>

            <button
              className="generate-button"
              type="submit"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating QR Code" : "Generate QR Code"}
            </button>
          </form>

          {qrCode && (
            <section
              className="qr-result"
              role="region"
              aria-label="Generated QR Code"
            >
              <div className="qr-result-header">
                <div>
                  <p className="eyebrow">GENERATED</p>

                  <h2>QR Code Generated</h2>
                </div>

                <span className="success-label">Ready</span>
              </div>

              <div className="qr-card">
                <img
                  src={qrCode}
                  alt={`QR code for ticket ${ticketId.trim()}`}
                />
              </div>

              <div className="ticket-reference">
                <span>Ticket ID</span>
                <strong>{ticketId.trim()}</strong>
              </div>
            </section>
          )}

          {!qrCode && !error && !isGenerating && (
            <div className="empty-state" aria-live="polite">
              <div className="empty-icon" aria-hidden="true">
                QR
              </div>

              <h2>No QR code generated</h2>

              <p>
                Enter a Ticket ID above and generate a QR code when you are
                ready.
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="loading-state" role="status" aria-live="polite">
              <span className="loading-spinner" aria-hidden="true" />

              <div>
                <strong>Generating QR code</strong>

                <p>Please wait while the ticket is processed.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TicketGenerator;

import { describe, expect, test } from "vitest";
import { generateTicketQr, validateTicketId } from "./ticketService.js";

describe("Ticket service", () => {
  test("accepts a valid Ticket ID", () => {
    expect(validateTicketId("TICKET-12345")).toBe(true);
  });

  test("rejects an invalid Ticket ID", () => {
    expect(validateTicketId("INVALID-12345")).toBe(false);
  });

  test("rejects HTML or script input", () => {
    expect(validateTicketId("<script>alert(1)</script>")).toBe(false);
  });

  test("rejects an empty Ticket ID", () => {
    expect(validateTicketId("")).toBe(false);
  });

  test("generates a QR code for a valid Ticket ID", async () => {
    const result = await generateTicketQr("TICKET-12345");

    expect(result.ticketId).toBe("TICKET-12345");
    expect(result.qrCode).toMatch(/^data:image\/png;base64,/);
  });

  test("throws a validation error for an invalid Ticket ID", async () => {
    await expect(generateTicketQr("INVALID-12345")).rejects.toThrow(
      "Invalid Ticket ID",
    );
  });
});

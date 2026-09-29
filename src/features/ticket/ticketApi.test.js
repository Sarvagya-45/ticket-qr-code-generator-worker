import { describe, expect, test, vi, beforeEach } from "vitest";
import { generateTicketQr } from "./ticketApi";
import { apiRequest } from "../../services/api";

vi.mock("../../services/api", () => ({
  apiRequest: vi.fn(),
}));

describe("ticketApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("sends Ticket ID to the QR generation API", async () => {
    apiRequest.mockResolvedValue({
      qrCode: "data:image/png;base64,test",
    });

    const result = await generateTicketQr("TICKET-12345");

    expect(apiRequest).toHaveBeenCalledWith("/tickets/qr", {
      method: "POST",
      body: JSON.stringify({
        ticketId: "TICKET-12345",
      }),
    });

    expect(result).toEqual({
      qrCode: "data:image/png;base64,test",
    });
  });

  test("propagates API validation errors", async () => {
    apiRequest.mockRejectedValue(new Error("Request failed with status 400"));

    await expect(generateTicketQr("INVALID-123")).rejects.toThrow(
      "Request failed with status 400",
    );
  });

  test("propagates server errors", async () => {
    apiRequest.mockRejectedValue(new Error("Request failed with status 500"));

    await expect(generateTicketQr("TICKET-12345")).rejects.toThrow(
      "Request failed with status 500",
    );
  });

  test("propagates network errors", async () => {
    apiRequest.mockRejectedValue(new Error("Failed to fetch"));

    await expect(generateTicketQr("TICKET-12345")).rejects.toThrow(
      "Failed to fetch",
    );
  });

  test("does not modify the Ticket ID before sending it", async () => {
    apiRequest.mockResolvedValue({
      qrCode: "data:image/png;base64,test",
    });

    await generateTicketQr("TICKET-98765");

    expect(apiRequest).toHaveBeenCalledWith(
      "/tickets/qr",
      expect.objectContaining({
        body: JSON.stringify({
          ticketId: "TICKET-98765",
        }),
      }),
    );
  });
});

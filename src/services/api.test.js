import { describe, expect, test, vi, beforeEach } from "vitest";
import { apiRequest } from "./api";

describe("API service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("sends a POST request with the ticket ID", async () => {
    const mockResponse = {
      ok: true,
      headers: {
        get: vi.fn(() => "application/json"),
      },
      json: vi.fn(async () => ({
        qrCode: "data:image/png;base64,test",
      })),
    };

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(mockResponse);

    const result = await apiRequest("/tickets/qr", {
      method: "POST",
      body: JSON.stringify({
        ticketId: "TICKET-12345",
      }),
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:5000/api/tickets/qr",
      {
        method: "POST",
        body: JSON.stringify({
          ticketId: "TICKET-12345",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    expect(result).toEqual({
      qrCode: "data:image/png;base64,test",
    });
  });

  test("throws an error when the API request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));

    await expect(apiRequest("/tickets/qr")).rejects.toThrow("Failed to fetch");
  });

  test("returns text when the API does not return JSON", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      headers: {
        get: vi.fn(() => "text/plain"),
      },
      text: vi.fn(async () => "OK"),
    });

    const result = await apiRequest("/health");

    expect(result).toBe("OK");
  });
});

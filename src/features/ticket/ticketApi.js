import { apiRequest } from "../../services/api";

async function generateTicketQr(ticketId) {
  return apiRequest("/tickets/qr", {
    method: "POST",
    body: JSON.stringify({
      ticketId,
    }),
  });
}

export { generateTicketQr };

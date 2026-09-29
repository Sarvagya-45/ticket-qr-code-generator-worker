import { generateTicketQr } from "../services/ticketService.js";

async function createTicketQr(req, res, next) {
  try {
    const { ticketId } = req.body || {};

    if (typeof ticketId !== "string") {
      const error = new Error("Ticket ID is required");
      error.statusCode = 400;
      throw error;
    }

    const result = await generateTicketQr(ticketId);

    res.status(201).json({
      ticketId: result.ticketId,
      qrCode: result.qrCode,
    });
  } catch (error) {
    next(error);
  }
}

export { createTicketQr };

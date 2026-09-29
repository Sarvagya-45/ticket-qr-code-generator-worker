import mongoose from "mongoose";
import QRCode from "qrcode";

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    payload: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "generated", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const qrGenerationRecordSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      index: true,
    },
    generatedPayload: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Ticket =
  mongoose.models.Ticket ||
  mongoose.model("Ticket", ticketSchema);

const QrGenerationRecord =
  mongoose.models.QrGenerationRecord ||
  mongoose.model(
    "QrGenerationRecord",
    qrGenerationRecordSchema,
  );

function validateTicketId(ticketId) {
  return /^TICKET-\d+$/.test(ticketId);
}

async function generateTicketQr(ticketId) {
  const normalizedTicketId = ticketId.trim();

  if (!validateTicketId(normalizedTicketId)) {
    const error = new Error("Invalid Ticket ID");
    error.statusCode = 400;
    throw error;
  }

  const payload = normalizedTicketId;

  const qrCode = await QRCode.toDataURL(payload, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 320,
  });

  if (mongoose.connection.readyState === 1) {
    await Ticket.findOneAndUpdate(
      { ticketId: normalizedTicketId },
      {
        ticketId: normalizedTicketId,
        payload,
        status: "generated",
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    await QrGenerationRecord.create({
      ticketId: normalizedTicketId,
      generatedPayload: payload,
    });
  }

  return {
    ticketId: normalizedTicketId,
    qrCode,
  };
}

export {
  generateTicketQr,
  validateTicketId,
};

import express from "express";
import cors from "cors";
import env from "./config/env.js";
import { connectDatabase } from "./config/db.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import {
  securityMiddleware,
  apiRateLimiter,
} from "./middleware/security.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

app.use(securityMiddleware);

app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json({ limit: "10kb" }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "ticket-qr-backend",
  });
});

app.use("/api", apiRateLimiter);
app.use("/api/tickets", ticketRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

app.use(errorMiddleware);

async function startServer() {
  await connectDatabase();

  app.listen(env.PORT, () => {
    console.log(
      `[Server] Ticket QR backend running on http://localhost:${env.PORT}`,
    );
  });
}

startServer().catch((error) => {
  console.error("[Server] Failed to start:", error);
  process.exit(1);
});

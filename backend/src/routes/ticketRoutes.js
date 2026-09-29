import express from "express";
import { createTicketQr } from "../controllers/ticketController.js";

const router = express.Router();

router.post("/qr", createTicketQr);

export default router;

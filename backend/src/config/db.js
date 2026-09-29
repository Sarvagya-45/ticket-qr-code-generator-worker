import mongoose from "mongoose";
import env from "./env.js";

async function connectDatabase() {
  if (!env.MONGODB_URI) {
    console.log("[Database] MONGODB_URI not configured. Running without database.");
    return;
  }

  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("[Database] MongoDB connected.");
  } catch (error) {
    console.error("[Database] MongoDB connection failed:", error.message);
    console.log("[Database] Server will continue without database persistence.");
  }
}

export { connectDatabase };

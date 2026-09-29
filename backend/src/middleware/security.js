import helmet from "helmet";
import rateLimit from "express-rate-limit";

const securityMiddleware = helmet();

const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later.",
  },
});

export {
  securityMiddleware,
  apiRateLimiter,
};

function errorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error("[Server Error]", error);
  }

  res.status(statusCode).json({
    error:
      statusCode === 500
        ? "Internal server error"
        : error.message,
  });
}

export { errorMiddleware };

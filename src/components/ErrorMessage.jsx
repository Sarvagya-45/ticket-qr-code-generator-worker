function ErrorMessage({
  title = "Something went wrong",
  message = "Please try again.",
}) {
  return (
    <div className="error-message" role="alert">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;

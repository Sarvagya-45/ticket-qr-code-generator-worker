import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page not-found">
      <div className="container">
        <p className="section-label">404</p>

        <h1 className="section-title">Page not found.</h1>

        <p className="section-description">
          The page you requested does not exist.
        </p>

        <Link to="/" className="button button--primary">
          Return home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

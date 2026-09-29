import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Link to="/" className="site-logo">
            NextProject
          </Link>

          <p>
            A project built with a clear structure and accessible interface.
          </p>
        </div>

        <nav className="site-footer__links" aria-label="Footer navigation">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </nav>

        <p className="site-footer__copyright">© {currentYear} NextProject</p>
      </div>
    </footer>
  );
}

export default Footer;

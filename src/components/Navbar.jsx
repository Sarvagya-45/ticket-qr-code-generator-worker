import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink to="/" className="site-logo" onClick={closeMenu}>
          NextProject
        </NavLink>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav
          id="main-navigation"
          className={`site-nav ${isOpen ? "site-nav--open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "site-nav__link active" : "site-nav__link"
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <a className="site-nav__link" href="/#about" onClick={closeMenu}>
            About
          </a>

          <a className="site-nav__link" href="/#features" onClick={closeMenu}>
            Features
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

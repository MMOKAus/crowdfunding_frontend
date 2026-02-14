import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo1.png";
import "./NavBar.css";

import { getUser, getToken, logout } from "../utilities/auth";


export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();
  const isLoggedIn = Boolean(token && user?.username);

  function closeMenu() {
    setIsOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/"); // back home
  }


  return (
    <>
      <nav className="navbar">
        {/* LEFT: links (desktop) */}
        <div className={`nav-left ${isOpen ? "is-open" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          {!isLoggedIn ? (
            <>
          <Link to="login" onClick={closeMenu}>Log In</Link>
          <Link to="signup" className="nav-register" onClick={closeMenu}>
            Register
          </Link>
          </>
          ) : (
            <>
          <Link to="create" onClick={closeMenu}>Create Fundraiser</Link>
          <span className="nav-user">
                Hi, <strong>{user.username}</strong>
              </span>
              <button className="nav-logout" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}

        </div>

        {/* RIGHT: brand */}
        <div className="nav-right">
          <img src={logo} alt="PawFund logo" className="nav-logo" />
          <span className="nav-brand">
            <span className="brand-primary">Paw</span>
            <span className="brand-accent">Fund</span>
          </span>

          {/* Hamburger (mobile only) */}
          <button
            className={`nav-burger ${isOpen ? "is-open" : ""}`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay behind menu */}
      {isOpen && <div className="nav-overlay" onClick={closeMenu} />}

      <Outlet />
    </>
  );
}

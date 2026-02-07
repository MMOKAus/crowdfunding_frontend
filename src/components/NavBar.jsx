import { Link, Outlet, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  function handleLogout() {
    localStorage.removeItem("token");
    // if you store other things, clear them too:
    // localStorage.removeItem("username");
    // localStorage.removeItem("userId");

    navigate("/login");
  }

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>

        {isLoggedIn ? (
          <button type="button" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/create">Create Fundraiser</Link>

          </>
        )}
      </nav>

      <Outlet />
    </div>
  );
}

export default NavBar;
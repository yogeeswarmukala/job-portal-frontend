
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const favorites = useSelector(
    state => state.favorites || []
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("user"))
  );

  useEffect(() => {
    function updateLoginStatus() {
      setIsLoggedIn(Boolean(localStorage.getItem("user")));
    }

    window.addEventListener("authChanged", updateLoginStatus);

    return () => {
      window.removeEventListener("authChanged", updateLoginStatus);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  }

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        <span>JobPortal</span>
      </Link>

      <div className="navbar-links">

        <NavLink to="/jobs" className="nav-link">
          Jobs
        </NavLink>

        <NavLink to="/favorites" className="nav-link">
          Favorites
          <span className="favorite-count">
            {favorites.length}
          </span>
        </NavLink>

        {isLoggedIn ? (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;

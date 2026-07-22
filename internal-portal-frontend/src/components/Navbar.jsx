import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">
        Internal Operations Portal
      </span>

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
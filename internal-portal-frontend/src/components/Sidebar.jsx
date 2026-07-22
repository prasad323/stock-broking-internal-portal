import { Link } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h4>Internal Portal</h4>
      <hr />

      {role === "manager" ? (
        <>
          <Link className="d-block text-white mb-3" to="/manager/dashboard">
            Dashboard
          </Link>

          <Link className="d-block text-white mb-3" to="/manager/clients">
            Clients
          </Link>

          <Link className="d-block text-white mb-3" to="/manager/trades">
            Trades
          </Link>

          <Link className="d-block text-white mb-3" to="/manager/employees">
            Employees
          </Link>

          <Link className="d-block text-white mb-3" to="/manager/mappings">
            Mappings
          </Link>

          <Link className="d-block text-white mb-3" to="/manager/incentives">
            Incentives
          </Link>
        </>
      ) : (
        <>
          <Link className="d-block text-white mb-3" to="/employee/dashboard">
            Dashboard
          </Link>

          <Link className="d-block text-white mb-3" to="/employee/my-clients">
            My Clients
          </Link>

          <Link className="d-block text-white mb-3" to="/employee/my-incentives">
            My Incentives
          </Link>
        </>
      )}
    </div>
  );
}

export default Sidebar;
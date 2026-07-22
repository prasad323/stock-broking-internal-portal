import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { getEmployees } from "../../services/employee.service";
import socket from "../../socket/socket";
function Employees() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

 useEffect(() => {
  loadEmployees();

  socket.on("data-updated", () => {
    loadEmployees();
  });

  return () => {
    socket.off("data-updated");
  };
}, [page, search]);

  const loadEmployees = async () => {
    try {
      const res = await getEmployees(page, 5, search);

      setEmployees(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4">Employees</h2>

      <input
        className="form-control mb-3"
        placeholder="Search Employee..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.employeeId}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>

                <td>
                  {emp.status === "Active" ? (
                    <span className="badge bg-success">
                      Active
                    </span>
                  ) : (
                    <span className="badge bg-danger">
                      Inactive
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">

        <button
          className="btn btn-outline-primary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span className="fw-bold">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-outline-primary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>
    </DashboardLayout>
  );
}

export default Employees;
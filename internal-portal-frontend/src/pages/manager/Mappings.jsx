import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { getMappings } from "../../services/mapping.service";
import socket from "../../socket/socket";

function Mappings() {
  const [mappings, setMappings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMappings();

    socket.on("data-updated", () => {
      loadMappings();
    });

    return () => {
      socket.off("data-updated");
    };
  }, [page, search]);

  const loadMappings = async () => {
    try {
      const res = await getMappings(page, 5, search);

      console.log("Mappings API Response:", res.data);

      setMappings(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4">Client Mappings</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search Client ID..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
          </tr>
        </thead>

        <tbody>
          {mappings.length > 0 ? (
            mappings.map((mapping) => (
              <tr key={mapping._id}>
                <td>{mapping.clientId}</td>
                <td>{mapping.clientName}</td>
                <td>{mapping.employeeId}</td>
                <td>{mapping.employeeName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Mappings Found
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

export default Mappings;
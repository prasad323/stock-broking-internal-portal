import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { getMyClients } from "../../services/client.service";

function MyClients() {
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadClients();
  }, [page, search]);

  const loadClients = async () => {
    try {
      const res = await getMyClients(page, 5, search);

      setClients(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4">My Clients</h2>

      <input
        className="form-control mb-3"
        placeholder="Search Client..."
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
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>PAN</th>
          </tr>
        </thead>

        <tbody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client._id}>
                <td>{client.clientId}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.pan}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Clients Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-center gap-3">
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

export default MyClients;
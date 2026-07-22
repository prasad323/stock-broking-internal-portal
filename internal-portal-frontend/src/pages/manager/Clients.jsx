import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { getClients } from "../../services/client.service";
import socket from "../../socket/socket";
function Clients() {
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  loadClients();

  socket.on("data-updated", () => {
    console.log("Fresh data received");
    loadClients();
  });

  return () => {
    socket.off("data-updated");
  };
}, [page, search]);
  const loadClients = async () => {
  try {
    setLoading(true);

    const res = await getClients(page, 5, search);

    setClients(res.data.data);
    setTotalPages(res.data.totalPages);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
if (loading) {
  return (
    <DashboardLayout>
      <h4 className="text-center mt-5">Loading...</h4>
    </DashboardLayout>
  );
}
//   const loadClients = async () => {
//     try {
//       const res = await getClients(page, 5, search);

//       console.log("Current Page:", page);
//       console.log(res.data);

//       setClients(res.data.data);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (loading) {
//   return (
//     <DashboardLayout>
//       <h4 className="text-center mt-5">Loading...</h4>
//     </DashboardLayout>
//   );
// }
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4">Clients</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by client name..."
        value={search}
        onChange={handleSearch}
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

export default Clients;
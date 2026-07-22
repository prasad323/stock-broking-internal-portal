import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { getTrades } from "../../services/trade.service";
import socket from "../../socket/socket";
function Trades() {
  const [trades, setTrades] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

useEffect(() => {
  loadTrades();

  socket.on("data-updated", () => {
    loadTrades();
  });

  return () => {
    socket.off("data-updated");
  };
}, [page, search]);

  const loadTrades = async (searchValue = search) => {
    try {
      const res = await getTrades(page, 5, searchValue);

      setTrades(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);
    setPage(1);

    loadTrades(value);
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4">Trades</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Client ID..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Trade ID</th>
            <th>Client ID</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Brokerage</th>
            <th>Trade Date</th>
          </tr>
        </thead>

        <tbody>
          {trades.length > 0 ? (
            trades.map((trade) => (
              <tr key={trade._id}>
                <td>{trade.tradeId}</td>
                <td>{trade.clientId}</td>
                <td>{trade.symbol}</td>
                <td>{trade.quantity}</td>
                <td>₹{trade.price}</td>
                <td>₹{trade.brokerage}</td>
                <td>
                  {new Date(trade.tradeDate).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Trades Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap mt-3">
        <button
          className="btn btn-outline-primary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => {
          if (
            i + 1 === 1 ||
            i + 1 === totalPages ||
            (i + 1 >= page - 2 && i + 1 <= page + 2)
          ) {
            return (
              <button
                key={i}
                className={`btn ${
                  page === i + 1
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            );
          }

          if (i + 1 === page - 3 || i + 1 === page + 3) {
            return (
              <span key={i} className="px-2">
                ...
              </span>
            );
          }

          return null;
        })}

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

export default Trades;
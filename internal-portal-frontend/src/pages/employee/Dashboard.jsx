import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { getEmployeeDashboard } from "../../services/employeeDashboard.service";
import socket from "../../socket/socket";
function Dashboard() {
  const [stats, setStats] = useState({});

 useEffect(() => {
  loadDashboard();

  socket.on("data-updated", () => {
    loadDashboard();
  });

  return () => {
    socket.off("data-updated");
  };
}, []);

  const loadDashboard = async () => {
    try {
      const res = await getEmployeeDashboard();
      setStats(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4">Employee Dashboard</h2>

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow-sm">
            <h6>My Clients</h6>
            <h2>{stats.totalClients || 0}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow-sm">
            <h6>Total Trades</h6>
            <h2>{stats.totalTrades || 0}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow-sm">
            <h6>Total Brokerage</h6>
            <h2>₹{stats.totalBrokerage || 0}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow-sm">
            <h6>My Incentive</h6>
            <h2 className="text-success">
              ₹{stats.incentive || 0}
            </h2>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
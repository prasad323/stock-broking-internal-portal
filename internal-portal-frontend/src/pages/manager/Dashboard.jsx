import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import { getDashboard } from "../../services/dashboard.service";
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

      const res = await getDashboard();

      setStats(res.data.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <DashboardLayout>

      <h2>Manager Dashboard</h2>

      <div className="row mt-4">

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Clients</h5>
            <h2>{stats.totalClients}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Trades</h5>
            <h2>{stats.totalTrades}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Employees</h5>
            <h2>{stats.totalEmployees}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Mappings</h5>
            <h2>{stats.totalMappings}</h2>
          </div>
        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;
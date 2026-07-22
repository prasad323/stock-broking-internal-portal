import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { getIncentives } from "../../services/incentive.service";
import socket from "../../socket/socket";
function Incentives() {
  const [incentives, setIncentives] = useState([]);

 useEffect(() => {
  loadIncentives();

  socket.on("data-updated", () => {
    loadIncentives();
  });

  return () => {
    socket.off("data-updated");
  };
}, []);
  const loadIncentives = async () => {
    try {
      const res = await getIncentives();

      console.log(res.data);

      setIncentives(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4">Employee Incentives</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Clients</th>
            <th>Trades</th>
            <th>Total Brokerage</th>
            <th>Incentive %</th>
            <th>Final Incentive</th>
          </tr>
        </thead>

        <tbody>
          {incentives.length > 0 ? (
            incentives.map((item) => (
              <tr key={item.employeeId}>
                <td>{item.employeeId}</td>
                <td>{item.employeeName}</td>
                <td>{item.totalClients}</td>
                <td>{item.totalTrades}</td>
                <td>₹{item.totalBrokerage}</td>
                <td>{item.incentivePercentage}%</td>
                <td className="text-success fw-bold">
                  ₹{item.incentive}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Incentives Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Incentives;
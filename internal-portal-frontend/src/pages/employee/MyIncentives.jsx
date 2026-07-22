import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { getMyIncentive } from "../../services/incentive.service";

function MyIncentives() {
  const [data, setData] = useState({});

  useEffect(() => {
    loadIncentive();
  }, []);

  const loadIncentive = async () => {
    try {
      const res = await getMyIncentive();
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4">My Incentive</h2>

      <div className="card">
        <div className="card-body">

          <table className="table table-bordered">

            <tbody>

              <tr>
                <th>Employee ID</th>
                <td>{data.employeeId}</td>
              </tr>

              <tr>
                <th>Employee Name</th>
                <td>{data.employeeName}</td>
              </tr>

              <tr>
                <th>Total Clients</th>
                <td>{data.totalClients}</td>
              </tr>

              <tr>
                <th>Total Trades</th>
                <td>{data.totalTrades}</td>
              </tr>

              <tr>
                <th>Total Brokerage</th>
                <td>₹ {data.totalBrokerage}</td>
              </tr>

              <tr>
                <th>Incentive %</th>
                <td>{data.incentivePercentage}%</td>
              </tr>

              <tr className="table-success">
                <th>Final Incentive</th>
                <td>
                  <strong>₹ {data.incentive}</strong>
                </td>
              </tr>

            </tbody>

          </table>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default MyIncentives;
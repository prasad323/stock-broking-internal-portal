import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

import ManagerDashboard from "./pages/manager/Dashboard";
import Clients from "./pages/manager/Clients";
import MyClients from "./pages/employee/MyClients";
import Employees from "./pages/manager/Employees";
import Trades from "./pages/manager/Trades";
import NotFound from "./pages/NotFound";
import MyIncentives from "./pages/employee/MyIncentives";
import Mappings from "./pages/manager/Mappings";
import EmployeeDashboard from "./pages/employee/Dashboard";
import Incentives from "./pages/manager/Incentives";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />


        <Route
          path="/manager/incentives"
          element={
            <PrivateRoute role="manager">
              <Incentives />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/employee/my-incentives"
          element={
            <PrivateRoute role="employee">
              <MyIncentives />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee/my-clients"
          element={
            <PrivateRoute role="employee">
              <MyClients />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/trades"
          element={
            <PrivateRoute role="manager">
              <Trades />
            </PrivateRoute>
          }
        />

        <Route
          path="/manager/mappings"
          element={
            <PrivateRoute role="manager">
              <Mappings />
            </PrivateRoute>
          }
        />
        {/* Manager Routes */}

        <Route
          path="/manager/dashboard"
          element={
            <PrivateRoute role="manager">
              <ManagerDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/manager/clients"
          element={
            <PrivateRoute role="manager">
              <Clients />
            </PrivateRoute>
          }
        />

        <Route
          path="/manager/employees"
          element={
            <PrivateRoute role="manager">
              <Employees />
            </PrivateRoute>
          }
        />

        {/* Employee Routes */}

        <Route
          path="/employee/dashboard"
          element={
            <PrivateRoute role="employee">
              <EmployeeDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
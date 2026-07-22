import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div
          className="p-4"
          style={{
            width: "100%",
            background: "#f4f6f9",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>

      </div>
    </>
  );
}

export default DashboardLayout;
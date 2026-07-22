import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";

function Login() {

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await login(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      

if (res.data.role === "manager") {
  navigate("/manager/dashboard");
} else {
  navigate("/employee/dashboard");
}

      console.log(res.data);

    } catch (err) {

      alert(err.response?.data?.message || "Login Failed");

    }

  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card">

            <div className="card-header">
              <h3>Login</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label>Username</label>

                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">

                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />

                </div>

                <button className="btn btn-primary w-100">
                  Login
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
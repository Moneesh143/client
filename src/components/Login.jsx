import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../Style/login.css";
import { Link, Navigate } from "react-router-dom";
function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      {/* <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h3 className="text-center">LOGIN</h3>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small className="text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <span>
              Not Registered?{" "}
              <Link to="/register" className="register-link">
                REGISTER NOW
              </Link>
            </span>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div> */}
      <>
        <div className="login-container">
          <div className="left-half">
            {/* Home Page with Background Image */}
            <div className="home-content">
              <h2>Welcome to Task management Website</h2>
              <p>This is the LOGIN page content.</p>
            </div>
          </div>
          <div className="right-half">
            {/* Login Form */}
            <div className="login-content">
              <p>Welcome back !!</p>
              <h2>Login</h2>
              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <small className="text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <span>
                    Not Registered?{" "}
                    <Link to="/register" className="register-link">
                      REGISTER NOW
                    </Link>
                  </span>
                </div>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Login;

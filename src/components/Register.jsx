// Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Style/Register.css";

function Register({ isAuthenticated, setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);
    try {
      const res = await axios.post(
        "https://server-1-tenq.onrender.com/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAvatar("");
      setIsAuthenticated(true);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h3 className="register-heading">REGISTER</h3>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
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
        <div className="form-group">
          <label>Avatar</label>
          <input type="file" onChange={avatarHandler} />
        </div>
        <div className="text-center">
          <p>
            Already Registered?{" "}
            <Link to={"/login"} className="register-link">
              LOGIN
            </Link>
          </p>
        </div>
        <button type="submit" className="register-btn">
          Submit
        </button>
      </form>
    </div>
    // <>
    //   <h1>register comp</h1>
    // </>
  );
}

export default Register;

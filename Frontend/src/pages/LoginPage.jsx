import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const { login, forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(resetEmail);
      alert("Password reset link sent to your email.");
      setForgot(false);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const cardStyle = {
    maxWidth: 400,
    width: "100%",
    padding: "40px 32px",
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "box-shadow 0.3s",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    margin: "12px 0",
    borderRadius: "8px",
    border: "1px solid #b3d1ff",
    fontSize: "17px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    background: "#f7fbff",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    marginTop: "22px",
    background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "17px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,123,255,0.10)",
    transition: "background 0.2s, transform 0.2s",
  };

  const headingStyle = {
    marginBottom: "28px",
    color: "#007bff",
    fontWeight: 800,
    fontSize: "2.2rem",
    letterSpacing: "1px",
    textShadow: "0 2px 8px #e3f0ff",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Login</h2>
        {!forgot ? (
          <form onSubmit={submit} style={{ width: "100%" }}>
            <input
              style={inputStyle}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
            <input
              style={inputStyle}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" style={buttonStyle}>
              Login
            </button>
            <div style={{ marginTop: "18px", textAlign: "center" }}>
              <span>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{ color: "#007bff", fontWeight: 600 }}
                >
                  Register
                </Link>
              </span>
              <br />
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  fontWeight: 600,
                  marginTop: "10px",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setForgot(true)}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgot} style={{ width: "100%" }}>
            <input
              style={inputStyle}
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              type="email"
            />
            <button type="submit" style={buttonStyle}>
              Send Reset Link
            </button>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                fontWeight: 600,
                marginTop: "10px",
                cursor: "pointer",
                textDecoration: "underline",
                width: "100%",
              }}
              onClick={() => setForgot(false)}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

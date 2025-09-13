import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const nav = useNavigate();

  return (
    <header
      style={{
        width: "100%",
        background: "linear-gradient(90deg, #ff6f61 0%, #fda085 100%)",
        padding: "18px 0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ marginLeft: "2rem" }}>
        <Link
          to="/"
          style={{
            color: "#fff",
            fontWeight: 800,
            fontSize: "2.2rem",
            textDecoration: "none",
            letterSpacing: "2px",
            textShadow: "0 2px 8px #fda085",
          }}
        >
          E-Shop
        </Link>
      </div>
      <nav
        style={{
          marginRight: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Link
          to="/"
          style={{ color: "#fff", fontWeight: 600, fontSize: "1.1rem" }}
        >
          Home
        </Link>
        <Link
          to="/cart"
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: "1.1rem",
            position: "relative",
          }}
        >
          Cart
          <span
            style={{
              background: "#fff",
              color: "#ff6f61",
              borderRadius: "50%",
              padding: "2px 8px",
              fontSize: "0.9rem",
              fontWeight: 700,
              marginLeft: "6px",
            }}
          >
            {cart.items.length}
          </span>
        </Link>
        {user ? (
          <>
            <span style={{ color: "#fff", fontWeight: 600, margin: "0 10px" }}>
              Hi, {user.name}
            </span>
            <button
              onClick={() => {
                logout();
                nav("/login");
              }}
              style={{
                padding: "8px 18px",
                borderRadius: "8px",
                border: "none",
                background: "#fff",
                color: "#ff6f61",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "#fff", fontWeight: 600, fontSize: "1.1rem" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{ color: "#fff", fontWeight: 600, fontSize: "1.1rem" }}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

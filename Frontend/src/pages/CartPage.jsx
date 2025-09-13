import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useContext(CartContext);
  const subtotal = cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "32px 24px",
        background: "rgba(255,255,255,0.95)",
        borderRadius: "14px",
        boxShadow: "0 4px 24px rgba(255,111,97,0.13)",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <h2
        style={{
          color: "#ff6f61",
          fontWeight: 700,
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        Your Cart
      </h2>
      {cart.items.length === 0 && (
        <p
          style={{
            color: "#888",
            fontSize: "1.1rem",
            textAlign: "center",
          }}
        >
          Cart is empty
        </p>
      )}
      {cart.items.map((item) => (
        <div
          key={item.product}
          style={{
            border: "1px solid #fff3e0",
            borderRadius: "8px",
            padding: "18px",
            margin: "14px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff3e0",
          }}
        >
          <div>
            <p
              style={{
                fontWeight: 600,
                fontSize: "1.1rem",
                margin: 0,
              }}
            >
              {item.name}
            </p>
            <p
              style={{
                color: "#ff6f61",
                fontWeight: 500,
                margin: "6px 0",
              }}
            >
              ₹{item.price}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={() => updateQty(item.product, item.quantity - 1)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                background: "#fff",
                color: "#ff6f61",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span
              style={{
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQty(item.product, item.quantity + 1)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                background: "#fff",
                color: "#ff6f61",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.product)}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              border: "none",
              background: "linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              marginLeft: "18px",
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <h3
        style={{
          marginTop: "32px",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Total:{" "}
        <span
          style={{
            color: "#ff6f61",
          }}
        >
          ₹{subtotal}
        </span>
      </h3>
      <Link to="/checkout">
        <button
          disabled={cart.items.length === 0}
          style={{
            background:
              cart.items.length === 0
                ? "#ccc"
                : "linear-gradient(90deg, #ff6f61 0%, #fda085 100%)",
            color: "#fff",
            width: "100%",
            padding: "14px",
            marginTop: "18px",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: cart.items.length === 0 ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(255,111,97,0.10)",
            transition: "background 0.2s",
          }}
        >
          Checkout
        </button>
      </Link>
    </div>
  );
}

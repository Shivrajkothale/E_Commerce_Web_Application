import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import api from "../api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  // Shipping state
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Payment state
  const [payment, setPayment] = useState({
    method: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const handleChange = (field, value) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field, value) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
  };

  const submitOrder = async () => {
    if (!user) {
      alert("Please log in first");
      nav("/login");
      return;
    }
    if (!shipping.firstName || !shipping.address) {
      alert("Please fill in all required fields");
      return;
    }
    try {
      await api.post("/orders", {
        items: cart.items.map((i) => ({
          product:
            typeof i.product === "object" && i.product !== null
              ? i.product._id
              : i.product,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        shippingAddress: {
          firstName: shipping.firstName,
          lastName: shipping.lastName,
          street: shipping.address,
          city: shipping.city,
          postalCode: shipping.postalCode,
          country: shipping.country,
          phone: shipping.phone,
        },
        paymentMethod: payment.method,
        paymentDetails:
          payment.method === "card"
            ? {
                cardNumber: payment.cardNumber,
                expiry: payment.expiry,
                cvv: payment.cvv,
                nameOnCard: payment.nameOnCard,
              }
            : null,
      });
      clearCart();
      alert("Order placed successfully ✅");
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        padding: "40px",
        background: "linear-gradient(120deg, #fff3e0 0%, #f7fbff 100%)",
        minHeight: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      {/* LEFT COLUMN */}
      <div
        style={{
          flex: 2,
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "32px 24px",
        }}
      >
        <h2 style={{ color: "#ff6f61", fontWeight: 700, marginBottom: "18px" }}>
          Shipping Information
        </h2>
        <form
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <input
            placeholder="First Name"
            value={shipping.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #fda085",
              fontSize: "16px",
              outline: "none",
              background: "#fff3e0",
            }}
          />
          <input
            placeholder="Last Name"
            value={shipping.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #fda085",
              fontSize: "16px",
              outline: "none",
              background: "#fff3e0",
            }}
          />
          <input
            style={{
              gridColumn: "span 2",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #fda085",
              fontSize: "16px",
              outline: "none",
              background: "#fff3e0",
            }}
            placeholder="Address"
            value={shipping.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <input
            placeholder="City"
            value={shipping.city}
            onChange={(e) => handleChange("city", e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #fda085",
              fontSize: "16px",
              outline: "none",
              background: "#fff3e0",
            }}
          />
          <input
            placeholder="Postal Code"
            value={shipping.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #fda085",
              fontSize: "16px",
              outline: "none",
              background: "#fff3e0",
            }}
          />
          <input
            placeholder="Country"
            value={shipping.country}
            onChange={(e) => handleChange("country", e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #fda085",
              fontSize: "16px",
              outline: "none",
              background: "#fff3e0",
            }}
          />
          <input
            placeholder="Phone"
            value={shipping.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #fda085",
              fontSize: "16px",
              outline: "none",
              background: "#fff3e0",
            }}
          />
        </form>

        <h2
          style={{
            marginTop: "30px",
            color: "#ff6f61",
            fontWeight: 700,
            marginBottom: "18px",
          }}
        >
          Payment Method
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "10px",
          }}
        >
          <label style={{ fontWeight: 500 }}>
            <input
              type="radio"
              name="payment"
              checked={payment.method === "card"}
              onChange={() => handlePaymentChange("method", "card")}
              style={{ marginRight: "8px" }}
            />
            Credit Card
          </label>
          {payment.method === "card" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "10px",
              }}
            >
              <input
                style={{
                  gridColumn: "span 2",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #fda085",
                  fontSize: "16px",
                  outline: "none",
                  background: "#fff3e0",
                }}
                placeholder="Card Number"
                value={payment.cardNumber}
                onChange={(e) =>
                  handlePaymentChange("cardNumber", e.target.value)
                }
              />
              <input
                placeholder="MM/YY"
                value={payment.expiry}
                onChange={(e) => handlePaymentChange("expiry", e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #fda085",
                  fontSize: "16px",
                  outline: "none",
                  background: "#fff3e0",
                }}
              />
              <input
                placeholder="CVV"
                value={payment.cvv}
                onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #fda085",
                  fontSize: "16px",
                  outline: "none",
                  background: "#fff3e0",
                }}
              />
              <input
                style={{
                  gridColumn: "span 2",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #fda085",
                  fontSize: "16px",
                  outline: "none",
                  background: "#fff3e0",
                }}
                placeholder="Cardholder Name"
                value={payment.nameOnCard}
                onChange={(e) =>
                  handlePaymentChange("nameOnCard", e.target.value)
                }
              />
            </div>
          )}
          <label style={{ fontWeight: 500 }}>
            <input
              type="radio"
              name="payment"
              checked={payment.method === "paypal"}
              onChange={() => handlePaymentChange("method", "paypal")}
              style={{ marginRight: "8px" }}
            />
            PayPal
          </label>
          <label style={{ fontWeight: 500 }}>
            <input
              type="radio"
              name="payment"
              checked={payment.method === "cod"}
              onChange={() => handlePaymentChange("method", "cod")}
              style={{ marginRight: "8px" }}
            />
            Cash on Delivery
          </label>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div
        style={{
          flex: 1,
          border: "1px solid #ddd",
          padding: "24px",
          borderRadius: "12px",
          height: "fit-content",
          background: "#fff",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ color: "#ff6f61", fontWeight: 700 }}>Order Summary</h3>
        <hr />
        {cart.items.length === 0 ? (
          <p style={{ color: "#888" }}>No items in cart.</p>
        ) : (
          cart.items.map((i) => (
            <div
              key={i.product}
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 0",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              <span>
                {i.name} x {i.quantity}
              </span>
              <span>₹{i.price * i.quantity}</span>
            </div>
          ))
        )}
        <hr />
        <p style={{ fontWeight: 500 }}>
          Subtotal:{" "}
          <b>₹{cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0)}</b>
        </p>
        <p style={{ fontWeight: 500 }}>
          Shipping: <b>₹99</b>
        </p>
        <p style={{ fontWeight: 500 }}>
          Tax: <b>₹50</b>
        </p>
        <h3 style={{ marginTop: "18px", fontWeight: 700 }}>
          Total: ₹
          {cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0) + 149}
        </h3>
        <button
          style={{
            background: "linear-gradient(90deg, #ff6f61 0%, #fda085 100%)",
            color: "white",
            width: "100%",
            padding: "14px",
            marginTop: "18px",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(255,111,97,0.10)",
            transition: "background 0.2s",
          }}
          onClick={submitOrder}
        >
          Place Order
        </button>
        <p
          style={{
            fontSize: "0.9rem",
            marginTop: "10px",
            textAlign: "center",
            color: "#888",
          }}
        >
          By placing your order, you agree to our{" "}
          <a href="#" style={{ color: "#ff6f61" }}>
            Terms & Conditions
          </a>
          .
        </p>
      </div>
    </div>
  );
}

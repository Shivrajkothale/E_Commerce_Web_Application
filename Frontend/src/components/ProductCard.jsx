import React, { useState } from "react";
import { Link } from "react-router-dom";

const fallbackImg = "https://via.placeholder.com/150?text=No+Image";

export default function ProductCard({ product, onAddToCart }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = product.imageUrl || fallbackImg;

  return (
    <div
      style={{
        border: "none",
        borderRadius: "18px",
        boxShadow: "0 4px 18px rgba(255,111,97,0.13)",
        padding: "20px 16px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "320px",
        width: "100%",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
    >
      <div
        style={{
          background: "linear-gradient(120deg, #fda085 0%, #ff6f61 100%)",
          height: "150px",
          width: "100%",
          borderRadius: "12px",
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={imgError ? fallbackImg : imageUrl}
          alt={product.name}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            borderRadius: "12px",
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          onError={() => setImgError(true)}
        />
      </div>
      <h4
        style={{
          margin: "0 0 8px 0",
          color: "#ff6f61",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {product.name}
      </h4>
      <p
        style={{
          margin: "0 0 16px 0",
          fontSize: "1.1rem",
          color: "#333",
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        ₹{product.price}
      </p>
      <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
        <Link to={`/product/${product._id}`}>
          <button
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              border: "none",
              background: "#fff3e0",
              color: "#ff6f61",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            View
          </button>
        </Link>
        <button
          onClick={() => onAddToCart && onAddToCart(product)}
          style={{
            padding: "8px 18px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(90deg, #ff6f61 0%, #fda085 100%)",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

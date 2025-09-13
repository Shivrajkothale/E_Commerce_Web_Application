import React, { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data);
      const cats = Array.from(
        new Set(
          res.data
            .map((p) =>
              typeof p.category === "object" ? p.category.name : p.category
            )
            .filter(Boolean)
        )
      );
      setCategories(["All", ...cats]);
    });
  }, []);

  const filteredProducts = products.filter((p) => {
    const catName =
      typeof p.category === "object" ? p.category.name : p.category;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || catName === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        padding: "2rem",
        background: "rgba(255,255,255,0.7)",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          marginBottom: "1.5rem",
          color: "#ff6f61",
          fontWeight: 800,
          fontSize: "2.2rem",
          textAlign: "center",
          letterSpacing: "1px",
        }}
      >
        Products
      </h2>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1.5rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #ff6f61",
            fontSize: "16px",
            width: "250px",
            outline: "none",
            background: "#fff",
          }}
        />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              border: "none",
              background:
                category === cat
                  ? "linear-gradient(90deg, #ff6f61 0%, #fda085 100%)"
                  : "#fff3e0",
              color: category === cat ? "#fff" : "#ff6f61",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow:
                category === cat ? "0 2px 8px rgba(255,111,97,0.10)" : "none",
              transition: "background 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "1.5rem",
          justifyItems: "center",
        }}
      >
        {filteredProducts.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}

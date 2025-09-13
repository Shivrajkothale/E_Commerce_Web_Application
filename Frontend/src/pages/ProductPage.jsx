import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { CartContext } from '../contexts/CartContext';

const fallbackImg = 'https://via.placeholder.com/300?text=No+Image';
const backendUrl = 'http://localhost:5000';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const imageUrl = product.imageUrl
    ? product.imageUrl.startsWith('/uploads')
      ? backendUrl + product.imageUrl
      : product.imageUrl
    : fallbackImg;

  return (
    <div style={{
      maxWidth: 600,
      margin: '40px auto',
      padding: '32px 24px',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <img
        src={imgError ? fallbackImg : imageUrl}
        alt={product.name}
        style={{
          width: '300px',
          height: '300px',
          objectFit: 'cover',
          borderRadius: '12px',
          marginBottom: '24px'
        }}
        onError={() => setImgError(true)}
      />
      <h2 style={{ color: '#007bff', fontWeight: 700 }}>{product.name}</h2>
      <p style={{ fontSize: '1.2rem', color: '#333', fontWeight: 500 }}>₹{product.price}</p>
      <p style={{ color: '#555', marginTop: '12px' }}>{product.description}</p>
      <p style={{ color: '#888', marginTop: '8px' }}>
        Category: {typeof product.category === 'object' ? product.category.name : product.category}
      </p>
      <button onClick={() => addToCart(product, 1)}>Add to Cart</button>
    </div>
  );
}

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductReviews from './ProductReviews';
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from '../../utlis/api';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = { ...product, quantity: 1 };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => navigate('/cart'), 1000);
  };

  if (!product) return <div className="text-center mt-5"></div>;

  return (
    <div className="container-fluid mt-5">
<div className="row mb-4">
  <div className="col-12 col-md-6 mb-3 mb-md-0 text-center">
    <img
      src={`http://localhost:3000/uploads/${product.image}`}
      className="img-fluid rounded shadow-sm"
      style={{ height: '500px', objectFit: 'contain', width: '100%' }}
      alt={product.name}
    />
  </div>
  <div className="col-12 col-md-6 text-center text-md-start">
    <h2 className="mb-3">{product.name}</h2>
    <p><strong>${product.price}</strong></p>
    <p className="text-muted">{product.description}</p>
    <button onClick={handleAddToCart} className="btn btn-success mb-2 w-75 w-md-auto">
      🛒 Add to Cart
    </button>
    {added && (
      <div className="alert alert-info mt-2">
        Added to cart! Price: ${product.price}
      </div>
    )}
    <Link to={`/reviews/${product.id}`} className="btn btn-outline-primary mt-2 w-75 w-md-auto">
      All Reviews on This Product
    </Link>
  </div>
</div>
      <ProductReviews productId={product.id} />
    </div>
  );
}
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from '../../utlis/api';

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get(`/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
<div className="container mt-5" style={{fontFamily:"serif"}}>
  <h2 className="mb-4">Product List</h2>
  <div className="row">
    {products.map(product => {
      const shortDescription = product.description.split(" ").length > 10 
      ? product.description.split(" ").slice(0, 10).join(" ") + "..."
      : product.description;

      return (
        <div className="col-md-4 mb-4" key={product.id}>
          <div className="card h-100 shadow-sm">
            <img 
              src={`http://localhost:3000/uploads/${product.image}`} 
              className="card-img-top p-3" 
              style={{ height: '500px', objectFit: 'contain' }} 
            />
            <div className="card-body d-flex flex-column">
              <h5>{product.name}</h5>
              <h5>{shortDescription}</h5>
              <h5>Stock Level: {product.stockLevel}</h5>
              <p className="text-success">${product.price}</p>
              <Link to={`/products/${product.id}`} className="btn btn-primary mt-auto border-0">View Product</Link>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>
  );
}
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const qty = item.quantity || 1;
      return sum + item.price * qty;
    }, 0).toFixed(2);
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-8">
          <h4>Order Summary</h4>
          <ul className="list-group">
            {cart.map((item, i) => (
              <li className="list-group-item d-flex justify-content-between" key={i}>
                <span>{item.title} × {item.quantity || 1}</span>
                <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>${getTotal()}</span>
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <h4>Payment Info</h4>
          <form>
            <div className="mb-2">
              <input type="text" className="form-control" placeholder="Card Number" />
            </div>
            <div className="mb-2">
              <input type="text" className="form-control" placeholder="Cardholder Name" />
            </div>
            <button className="btn btn-success w-100 mt-2">Confirm Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}

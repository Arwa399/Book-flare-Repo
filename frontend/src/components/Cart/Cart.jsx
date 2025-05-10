import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from '../../utlis/api';
import { useNavigate } from 'react-router';

export default function Cart() {
  const [cart, setCart] = useState();
  const [CartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const go = useNavigate()
  useEffect(() => {
    const fetchCart =async ()=>{
      try {
        const res = await api.get('/cart/items')
        setCart(res.data.cart);
        setCartItems(res.data.cart.CartItems)
        setTotalPrice(res.data.totalCost);        
      } catch (error) {
        console.log(error);
      }
    }

    fetchCart()
  }, []);
  const handleCheckout = async () => {
    try {
      const cartData = {
        cartItem: CartItems.map((item) => ({
          ProductId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        totalCost: totalPrice
      };
  
      const res = await api.post('/orders', { cart: cartData });
      console.log(res)
      if (res.status === 200) {
        alert('Order created successfully!');
        go('/checkout'); 
      } else {
        alert('Something went wrong while placing the order');
      }
    } catch (err) {
      console.error(err);
      alert('Error placing order');
    }
  };

  

  const updateLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = async (item,index) => {

      try {
        const res = await api.patch(`/cart/items/${item.id}`, {quantity: item.quantity + 1})
        console.log(res.data)


        go(0)
        // const updatedCart = [...CartItems]
        // updatedCart[index].quantity += 1
        // setCart(updatedCart)

      } catch (error) {
      console.log(error)
        
      }

    // const updatedCart = [...cart];
    // updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    // updateLocalStorage(updatedCart);
  };

  const decreaseQuantity =async (item,index) => {
    try {
      const res = await api.patch(`/cart/items/${item.id}`, {quantity: item.quantity - 1})

      go(0)
            console.log(res.data)

      // const updatedCart = [...CartItems]
      // updatedCart[index].quantity -= 1
      // setCart(updatedCart)

    } catch (error) {
      console.log(error)
    }

    // const updatedCart = [...cart];
    // if ((updatedCart[index].quantity || 1) > 1) {
    //   updatedCart[index].quantity -= 1;
    //   updateLocalStorage(updatedCart);
    // }
  };

  const removeItem = async(itemId) => {
    try {
      const res = await api.delete(`/cart/items/${itemId}`)
      go(0)
    } catch (error) {
      console.log(error);
    }
    // const updatedCart = [...cart];
    // updatedCart.splice(index, 1);
    // updateLocalStorage(updatedCart);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const qty = item.quantity || 1;
      return sum + item.price * qty;
    }, 0).toFixed(2);
  };

  return (
    <div className="container-fluid mt-5">
      <h2>Your Cart</h2>
      {cart?.CartItems?.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          <ul className="list-group mb-3 m-2">
            {
              CartItems?.map((item,index)=> 
                <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center m-2"
            >

              <img src={`http://localhost:3000/uploads/${item.Product.image}`} style={{
                width: "100px",
                height: "100px"
              }} alt="" />
               <strong>name: {item?.Product?.name}</strong>

               <span className="text-muted">Price: ${item.price}</span>
               <span className="text-muted">quantity: {item.quantity}</span>
                  <br />
                  <div className="btn-group mt-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => decreaseQuantity(item,index)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity || 1}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => increaseQuantity(item,index)}
                    >
                      +
                    </button>
                  </div>


               <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
               {/* <ProductCard product={item?.Product}/> */}
              </li>)
            }
            {/* {cart.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center m-2"
              >
                <div>
                  <strong>{item.title}</strong>
                  <br />
                  <span className="text-muted">Price: ${item.price}</span>
                  <br />
                  <div className="btn-group mt-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => decreaseQuantity(index)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity || 1}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => increaseQuantity(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <span className="badge bg-success mb-2">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))} */}
          </ul>
          <h4>Total: ${totalPrice}</h4>
        </div>
      )}
<button className="btn btn-primary mt-3" onClick={handleCheckout}>
  Proceed to Checkout
</button>
    </div>
  );
}
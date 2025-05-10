// import { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Cart() {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCart(storedCart);
//   }, []);



//   const updateLocalStorage = (updatedCart) => {
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const increaseQuantity = (index) => {
//     const updatedCart = [...cart];
//     updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
//     updateLocalStorage(updatedCart);
//   };

//   const decreaseQuantity = (index) => {
//     const updatedCart = [...cart];
//     if ((updatedCart[index].quantity || 1) > 1) {
//       updatedCart[index].quantity -= 1;
//       updateLocalStorage(updatedCart);
//     }
//   };

//   const removeItem = (index) => {
//     const updatedCart = [...cart];
//     updatedCart.splice(index, 1);
//     updateLocalStorage(updatedCart);
//   };

//   const getTotal = () => {
//     return cart.reduce((sum, item) => {
//       const qty = item.quantity || 1;
//       return sum + item.price * qty;
//     }, 0).toFixed(2);
//   };

//   return (
//     <div className="container9 mt-5">
//       <h2>Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>No items in cart.</p>
//       ) : (
//         <div>
//           <ul className="list-group mb-3 m-2">
//             {cart.map((item, index) => (
//               <li
//                 key={index}
//                 className="list-group-item d-flex justify-content-between align-items-center m-2"
//               >
//                 <div>
//                   <strong>{item.title}</strong>
//                   <br />
//                   <span className="text-muted">Price: ${item.price}</span>
//                   <br />
//                   <div className="btn-group mt-2">
//                     <button
//                       className="btn btn-sm btn-outline-secondary"
//                       onClick={() => decreaseQuantity(index)}
//                     >
//                       -
//                     </button>
//                     <span className="mx-2">{item.quantity || 1}</span>
//                     <button
//                       className="btn btn-sm btn-outline-secondary"
//                       onClick={() => increaseQuantity(index)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <div className="d-flex flex-column align-items-end">
//                   <span className="badge bg-success mb-2">
//                     ${(item.price * (item.quantity || 1)).toFixed(2)}
//                   </span>
//                   <button
//                     className="btn btn-sm btn-danger"
//                     onClick={() => removeItem(index)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <h4>Total: ${getTotal()}</h4>
//         </div>
//       )}
// <button className="btn btn-primary mt-3" onClick={handleCheckout}>
//   Proceed to Checkout
// </button>
//     </div>
//   );
// }
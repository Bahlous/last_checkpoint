// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { getCart, removeFromCart } from '../JS/actions/cartActions';

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cart = useSelector(state => state.cart.cartItems);

//   useEffect(() => {
//     dispatch(getCart());
//   }, [dispatch]);

//   const handleRemove = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         cart.map(item => (
//           <div key={item._id}>
//             <h3>{item.title}</h3>
//             <img src={item.image} alt={item.title} width="100" />
//             <p>Price: {item.price} DT</p>
//             <p>Quantity: {item.quantity}</p>
//             <p>Total: {item.price * item.quantity} €</p>
//             <button onClick={() => handleRemove(item._id)}>Remove</button>
//           </div>
//         ))
//       )}
//       <h2>Total Price: {total} €</h2>
//     </div>
//   );
// };

// export default Cart;

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCart, removeFromCart } from '../JS/actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart?.cartItems || []);
  const loading = useSelector(state => state.cart?.loading);
  const errors = useSelector(state => state.cart?.errors);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>

      {loading && <p>Loading...</p>}
      {errors && <p style={{ color: 'red' }}>{errors}</p>}

      {!loading && cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map(item => (
          <div key={item._id}>
            <h3>{item.title}</h3>
            <img src={item.image} alt={item.title} width="100" />
            <p>Price: {item.price} DT</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: {(item.price * item.quantity).toFixed(2)} DT</p>
            <button onClick={() => handleRemove(item._id)}>Remove</button>
          </div>
        ))
      )}

      {!loading && cart.length > 0 && (
        <h2>Total Price: {total.toFixed(2)} DT</h2>
      )}
    </div>
  );
};

export default Cart;

const initialState = {
    cartItems: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOAD_CART':
        return { ...state, cartItems: action.payload.map(i => ({
          _id: i.productId._id,
          title: i.productId.title,
          image: i.productId.image,
          price: i.productId.price,
          quantity: i.quantity,
        })) };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  
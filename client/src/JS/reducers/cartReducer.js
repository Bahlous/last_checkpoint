import {
  LOAD_CART,
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
  FAIL_CART,
} from "../actionTypes/cartActionTypes";

const initialState = {
  cartItems: [],
  loading: false,
  errors: null,
};

const formatCartItems = (payload) =>
  Array.isArray(payload)
    ? payload.map((item) => ({
        _id: item.productId._id,
        title: item.productId.title,
        image: item.productId.image,
        price: item.productId.price,
        quantity: item.quantity,
      }))
    : [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return { ...state, loading: true };

    case GET_CART:
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: formatCartItems(action.payload),
        loading: false,
      };

    case UPDATE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case CLEAR_CART:
      return { ...state, cartItems: [] };

    case FAIL_CART:
      return { ...state, errors: action.payload, loading: false };

    default:
      return state;
  }
};

export default cartReducer;

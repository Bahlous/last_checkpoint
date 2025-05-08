import axios from 'axios';

import { ADD_TO_CART, FAIL_CART, GET_CART, LOAD_CART, REMOVE_FROM_CART } from "../actionTypes/cartActionTypes";


export const getCart = () => async (dispatch) => {
//   const { data } = await axios.get('/api/cart');
//   dispatch({ type: 'LOAD_CART', payload: data });
dispatch({type:LOAD_CART})
try {
    let config = {
        headers: {
            authorization: localStorage.getItem('token'),
        },
    };
    const result = await axios.get("/api/cart/getCart", config);
    dispatch({type:GET_CART, payload:result.data})
} catch (error) {
    dispatch({type:FAIL_CART, payload:error.response.data})
}
};

// Add to Cart
export const addToCart = (productId) => async (dispatch) => {
    dispatch({ type: LOAD_CART });
    try {
        let config = {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        };
      const result = await axios.post("/api/cart/add", { productId }, config);
      dispatch({ type: ADD_TO_CART, payload: result.data });
    } catch (error) {
      dispatch({ type: FAIL_CART, payload: error.response?.data });
    }
  };

// Remove from Cart
export const removeFromCart = (productId) => async (dispatch) => {
    dispatch({ type: LOAD_CART });
    try {
        let config = {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        };
      const result = await axios.delete(`/api/cart/remove/${productId}`, config);
      dispatch({ type: REMOVE_FROM_CART, payload: result.data });
    } catch (error) {
      dispatch({ type: FAIL_CART, payload: error.response?.data });
    }
  };
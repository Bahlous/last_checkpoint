import axios from "axios";
import {
  ADD_TO_CART,
  FAIL_CART,
  GET_CART,
  LOAD_CART,
  REMOVE_FROM_CART,
} from "../actionTypes/cartActionTypes";

// Get Cart
export const getCart = () => async (dispatch) => {
  dispatch({ type: LOAD_CART });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const result = await axios.get("/api/cart/getCart", config);
    console.log("Cart API response:", result.data);
    dispatch({ type: GET_CART, payload: result.data });
  } catch (error) {
    dispatch({
      type: FAIL_CART,
      payload: error.response?.data || "Erreur inconnue",
    });
  }
};

// Add to Cart
export const addToCart = (productId) => async (dispatch) => {
  dispatch({ type: LOAD_CART });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const result = await axios.post("/api/cart/add", { productId }, config);
    dispatch({ type: ADD_TO_CART, payload: result.data });
  } catch (error) {
    dispatch({
      type: FAIL_CART,
      payload: error.response?.data || "Erreur ajout panier",
    });
  }
};

// Remove from Cart
export const removeFromCart = (productId) => async (dispatch) => {
  dispatch({ type: LOAD_CART });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const result = await axios.delete(`/api/cart/remove/${productId}`, config);
    dispatch({ type: REMOVE_FROM_CART, payload: result.data });
  } catch (error) {
    dispatch({
      type: FAIL_CART,
      payload: error.response?.data || "Erreur suppression panier",
    });
  }
};

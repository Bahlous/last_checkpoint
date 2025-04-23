import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, FAIL_PRODUCT, GET_MY_PRODUCT, GET_ONE_PRODUCT, GET_PRODUCTS, LOAD_PRODUCT } from "../actionTypes/productActionTypes";
//initialState
const initialState = {
    loadP: false,
    products: [],
    myProduct: [],
    product: {},
    success: false,
    errors: null, //
  }
    
  //pure function
  
  const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case LOAD_PRODUCT:
        return { ...state, loadP: true };
      case ADD_PRODUCT:
        return {
          ...state,
          loadP: false,
          products: [...state.products, payload.newProd],
          success: true,
        };
      case GET_PRODUCTS:
        return {
          ...state,
          loadP: false,
          products: payload,
          success: true,
        };
      case GET_ONE_PRODUCT:
        return {
          ...state,
          loadP: false,
          product: payload.prodToGet,
          success: true,
        };
      case GET_MY_PRODUCT:
        return {
          ...state,
          loadP: false,
          myProduct: payload.myProdList,
        };
      case EDIT_PRODUCT:
        return {
          ...state,
          loadP: false,
          products: state.products.map((elt) =>
            elt._id === payload.id ? { ...elt, ...payload.productEdited } : elt
          ),
          success: true,
        };
      case DELETE_PRODUCT:
        return {
          ...state,
          loadP: false,
          products: state.products.filter((elt) => elt._id !== payload.id),
          success: true,
        };
      case FAIL_PRODUCT:
        return { ...state, loadP: false, errors: payload , success:false};
  
      default:
        return state;
    }
  };
  
  export default productReducer;
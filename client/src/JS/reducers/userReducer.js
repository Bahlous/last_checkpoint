//import

import { CURRENT_AUTH } from "../actionTypes/authActionType";
import {
    DELETE_USER,
    FAIL_USER,
    GET_USERS,
    LOAD_USER,
  } from "../actionTypes/userActionTypes";
  
  //initialisation
  const intialState = {
    users: [],
    load: false,
    success: [],
    errors: [],
  };
  
  //pure function
  const userReducer = (state = intialState, { type, payload }) => {
    switch (type) {
      case LOAD_USER:
        return { ...state, load: true };
      case GET_USERS:
        return {
          ...state,
          load: false,
          users: payload.data.listUsers,
          success: payload.success,
        };
      case DELETE_USER:
        const newUsers = state.users.filter((el) => el._id !== payload);
        // console.log(newUsers)
        return { ...state, load: false, users: newUsers };
        case CURRENT_AUTH:
      return { ...state, isLoad: false, user: payload, isAuth: true };
      case FAIL_USER:
        return { ...state, load: false, errors: payload };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
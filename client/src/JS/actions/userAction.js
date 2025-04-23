import axios from "axios";
import {
  DELETE_USER,
  FAIL_USER,
  GET_USERS,
  LOAD_USER,
} from "../actionTypes/userActionTypes";

export const getUsers = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const listUsers = await axios.get("/api/user/allUsers", config);
    dispatch({ type: GET_USERS, payload: listUsers });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const deleteUser = (idUser) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
     const config = {
       headers: {
         authorization: localStorage.getItem("token"),
       },
    };
    const userToDel = await axios.delete(`/api/user/${idUser}`, config)
    dispatch({ type: DELETE_USER, payload: userToDel })
    dispatch(getUsers());
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
}
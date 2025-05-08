import {combineReducers} from "redux";
import authReducer from "./authreducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
     authReducer,
     userReducer,
     productReducer,
    cartReducer,
    });



export default rootReducer;
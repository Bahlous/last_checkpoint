import { applyMiddleware, compose,createStore } from "redux";
import {thunk} from "redux-thunk";

// ecriture mannuelle(a la main)
import rootReducer from "../reducers";
//********************************************* */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    // ecriture mannuelle(a la main)
    rootReducer,
    //*************************************
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
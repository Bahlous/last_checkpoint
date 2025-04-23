import{CURRENT_AUTH, FAIL_AUTH, LOAD_AUTH, LOGOUT_AUTH, SUCCESS_AUTH} from "../actionTypes/authActionType"
import axios from 'axios'


//action to register a new user
export const register = (newUser, navigate) => async(dispatch)=>{
dispatch({type: LOAD_AUTH});
try {
    const result = await axios.post('/api/auth/register', newUser)
    dispatch({type:SUCCESS_AUTH, payload:result.data});
    navigate("/profile");
} catch (error) {
    dispatch({type:FAIL_AUTH, payload:error.response.data.errors})
}

};
//action to sign in an existing user in DB
export const login = (user, navigate)=> async(dispatch) => {
    dispatch({type: LOAD_AUTH});
    try {
    const result = await axios.post('/api/auth/login', user);
    dispatch({type:SUCCESS_AUTH, payload: result.data});
    navigate("/profile");
    
} catch (error) {
    dispatch({type:FAIL_AUTH, payload:error.response.data.errors});
}

};
//action to verify the current user
export const current = ()=> async(dispatch) => {
    dispatch ({type: LOAD_AUTH});
    try {
        let config = {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        };
        const result = await axios.get('api/auth/current', config);
        dispatch({type:CURRENT_AUTH, payload: result.data});
    } catch (error) {
        dispatch({type:FAIL_AUTH, payload:error.response.data.errors});
    }
};
//remove token (sign out)
export const logout = (navigate) =>(dispatch) => {
dispatch({type:LOGOUT_AUTH});
navigate("/")
};
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./userRedux";
import { } from "./cartRedux";
// import { loginFailure, loginStart, loginSuccess} from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    alert("login successfull")
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    alert("register successfull")
    
  } catch (err) {
    dispatch(registerFailure());
  }
};

// export const cart = async (dispatch, cart) => {
 
//   try {
//     const res = await publicRequest.post("/cart", cart);
//     dispatch(cartSuccess(res.data));
//     alert("cart successfull")
//   } catch (err) {
//     dispatch(cartFailure());
//   }
// };



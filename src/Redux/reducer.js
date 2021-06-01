import { combineReducers } from "redux";
import {
  AUTH_LOADING,
  LOG_OUT,
  TEM_LOGIN

} from "./action";

const initialUserState = {
  AuthLoading: false,
  isLogin: false
};

const userReducer = (state = initialUserState, action) => {
  if (action.type === LOG_OUT) {
    return {
      ...state,
      AuthLoading: false,
    };
  }
  if (action.type === AUTH_LOADING) {
    return {
      ...state,
      AuthLoading: action.payload
    };
  }
  if (action.type === TEM_LOGIN) {
    return {
      ...state,
      isLogin: action.payload.isLogin
    };
  }
  return state;
};


const reducer = combineReducers({
  user: userReducer,
});
export default reducer;
import { combineReducers } from "redux";
import {
  AUTH_LOADING,
  LOG_OUT,
  TEM_LOGIN,
  USER_LOGIN,
  COUNTRY_NAME

} from "./action";

const initialUserState = {
  AuthLoading: false,
  isLogin: false,
  login: "",
  countryData: []
};

const userReducer = (state = initialUserState, action) => {
  if (action.type === LOG_OUT) {
    return {
      ...state,
      AuthLoading: false,
      login: "",
      countryData: []
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
  if (action.type === USER_LOGIN) {
    return {
      ...state,
      login: action.payload.login
    };
  }
  if (action.type === COUNTRY_NAME) {
    return {
      ...state,
      countryData: action.payload.countryData
    };
  }
  return state;
};


const reducer = combineReducers({
  user: userReducer,
});
export default reducer;
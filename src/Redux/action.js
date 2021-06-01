import NavigationService from '../RootNavigator/navigationService'
import Toast from 'react-native-simple-toast'
export const AUTH_LOADING = "AUTH_LOADING";
export const LOG_OUT = "LOG_OUT";
export const TEM_LOGIN = "TEM_LOGIN";


const baseUrl = "http://95.179.217.235/api/";

export const logOut = () => {
    return dispatch => {
        dispatch({ type: LOG_OUT })
    }
}
export const temLogin = (value) => {
    return dispatch => {
        dispatch({
            type: TEM_LOGIN,
            payload: {
                isLogin: value
            }
        })
    }
}






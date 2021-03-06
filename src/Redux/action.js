import NavigationService from '../RootNavigator/navigationService'
import Toast from 'react-native-simple-toast'
import { Alert } from 'react-native'
export const AUTH_LOADING = "AUTH_LOADING";
export const LOG_OUT = "LOG_OUT";
export const TEM_LOGIN = "TEM_LOGIN";
export const USER_LOGIN = "USER_LOGIN";
export const COUNTRY_NAME = "COUNTRY_NAME";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const FCM_TOKEN = "FCM_TOKEN";
export const CENTER_ID = "CENTER_ID";
export const MAIN_MENU = "MAIN_MENU";


const baseUrl = "https://199.247.13.90/api/",
    login = 'login',
    user = 'user',
    cancelSubscription = 'cancel-subscription',
    getMenu = 'get-menu',
    getFiles = 'get-files',
    getClasses = 'get-classes',
    getOrders = 'get-orders',
    getFamilies = 'get-families',
    getCategory = 'get-categories',
    getGenres = 'get-genres',
    getPecios = 'get-pecios',
    seenGenre = 'seen-genre',
    seenPecio = 'seen-pecio',
    uploadProfileImg = 'uploadProfileImage',
    seenCount = 'seen-count',
    animalSeenList = 'seen-genre-list',
    peciosSeenList = 'seen-pecio-list',
    peciosImg = 'upload-image-pecio',
    generImg = 'upload-image-genre',
    getCenters = 'get-points',
    getCentersDetail = 'get-center-detail',
    getGenreDetail = 'get-genre-detail',
    getPecioDetail = 'get-pecio-detail',
    getPointDetail = 'get-point-detail',
    getDiveDetail = 'get-dive-detail',
    submitRating = 'submit-rating',
    getListAll = 'get-list-all',
    submitinlistpecio = 'submit-in-list-pecio',
    submitinlistgenre = 'submit-in-list-genre',
    submitinlistfriend = 'submit-in-list-friend',
    fcmToken = 'fcm',
    getNotifications = 'get-notifications',
    search = 'search',
    getPath = 'get-path',
    storeDive = 'store-dive',
    userLogout = 'logout',
    getDives = 'get-dives',
    getScore = 'get-score',
    updateDive = 'update-dive',
    setLanguages = 'set-language',
    getCertificates = 'get-certificates',
    getDegrees = 'get-degrees',
    deleteNotification = 'delete-notification',
    updateCertificateDegree = 'update-certificate-degree',
    changePassword = 'change-password',
    erase = 'erase',
    deleteUpload = 'delete-upload',
    deleteDive = 'delete-dive',
    sendMail = 'sendMail',
    changePasswordNew = 'change-password-new',
    getSelectedGenres = 'get-selected-genres',
    getSelectedPecios = 'get-selected-pecios',
    getSelectedUsers = 'get-selected-users',
    getIndex = 'get-index',
    getIndex2 = 'get-index2',
    register = 'register';

const country_url = "https://countriesnow.space/api/v0.1/countries/positions"

export const saveCenterId = (value) => {
    return dispatch => {
        dispatch({
            type: CENTER_ID,
            payload: {
                centerId: value
            }
        })
    }
}
export const saveToken = (value) => {
    return dispatch => {
        dispatch({
            type: FCM_TOKEN,
            payload: {
                token: value
            }
        })
    }
}
export const setLanguage = (value) => {
    return dispatch => {
        dispatch({
            type: SET_LANGUAGE,
            payload: {
                language: value
            }
        })
    }
}
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
export const userLogin = (username, password) => {
    return dispatch => {
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + login, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                //console.log(json)
                if (json.status == 200) {
                    dispatch(getMainMenu(json.data.id))
                    dispatch({
                        type: USER_LOGIN,
                        payload: {
                            login: json
                        }
                    })
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                } else {
                    Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const getUpdateUser = (userID) => {
    return dispatch => {
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + user, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userID,
            })
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(json)
                if (json.status == 200) {
                    dispatch(getMainMenu(json.data.id))
                    dispatch({
                        type: USER_LOGIN,
                        payload: {
                            login: json
                        }
                    })
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                } else {
                    Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const cancelUserSubscription = (userID) => {
    return dispatch => {
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + cancelSubscription, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userID,
            })
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(json)
                if (json.status == 200) {
                    dispatch(getUpdateUser(userID))
                    // dispatch(getMainMenu(json.data.id))
                    // dispatch({
                    //     type: USER_LOGIN,
                    //     payload: {
                    //         login: json
                    //     }
                    // })
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                } else {
                    Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const userRegister = (name, email, password, certificate, degree) => {
    return dispatch => {
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + register, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                certificate: certificate,
                degree: degree
            })
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(json)
                if (json.status == 200) {
                    Alert.alert("", "Register Successfuly")
                    NavigationService.navigate('Login')
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                } else {
                    Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const getMainMenu = (userId) => {
    return dispatch => {
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + getMenu, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId
            })
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                //console.log(json)
                if (json.status == 200) {
                    dispatch({
                        type: MAIN_MENU,
                        payload: {
                            menuData: json
                        }
                    })
                } else if (json.status == 401) {
                    console.log('=====> 3', json)
                    //Alert.alert("", json.message)
                } else {
                    //Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
// export const getMainMenu = async (userId) => {
//     let api
//     try {
//         api = await fetch(baseUrl + getMenu, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 "Content-type": "application/json",
//             },
//             body: JSON.stringify({
//                 userId: userId
//             })
//         })
//             .then(res => res.json())
//             .then(json => {
//                 console.log(json)
//                 return json
//             })
//             .catch(error => {
//                 console.log("response error ===>", error)
//             })
//     } catch (error) {
//         console.log('my error' + error.message);
//     }
//     return api
// }
export const getMenuFiles = async (userId) => {
    let api
    try {
        api = await fetch(baseUrl + getFiles, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                return json
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getMenuClasses = async (id, userId) => {
    let api
    try {
        api = await fetch(baseUrl + getClasses, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                fileId: id,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                return json
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getMenuOrders = async (id, userId) => {
    let api
    try {
        api = await fetch(baseUrl + getOrders, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                classId: id,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                return json
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getMenuFamily = async (id, userId) => {
    let api
    try {
        api = await fetch(baseUrl + getFamilies, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                orderId: id,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                return json
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getMenuCategory = async (id, userId) => {
    let api
    try {
        api = await fetch(baseUrl + getCategory, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                familyId: id,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                return json
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getMenuGenro = async (id, userId) => {
    let api
    try {
        api = await fetch(baseUrl + getGenres, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                categoryId: id,
                userId: userId
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                return json
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getPeciosData = async (userId) => {
    console.log("Peicos api")
    let api
    try {
        api = await fetch(baseUrl + getPecios, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                return json
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const postGenerSeen = async (genreId, userId, isFirst) => {
    let api
    try {
        api = await fetch(baseUrl + seenGenre, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                genreId: genreId,
                userId: userId,
                isFirst: isFirst
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    if (isFirst === "no") {
                        Alert.alert("", json.message)
                        return json
                    } else {
                        return json
                    }
                } else if (json.status == 401) {
                    if (isFirst === "yes") {
                        console.log(json)
                    } else {
                        NavigationService.navigate('Subscription')
                    }
                }
                return json
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const postPecioSeen = async (pecioId, userId, isFirst) => {
    console.log(pecioId, " ", userId, isFirst)
    let api
    try {
        api = await fetch(baseUrl + seenPecio, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                pecioId: pecioId,
                userId: userId,
                isFirst: isFirst,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    if (isFirst === "no") {
                        Alert.alert("", json.message)
                        return json
                    } else {
                        return json
                    }
                } else if (json.status == 401) {
                    if (isFirst === "yes") {
                        console.log(json)
                    } else {
                        NavigationService.navigate('Subscription')
                    }
                }
                return json
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const postProfileImg = (userId, image) => {
    return dispatch => {
        const body = new FormData();
        body.append('userId', userId);
        body.append('image', image);
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + uploadProfileImg, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: body
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(json)
                if (json.status == 200) {
                    dispatch({
                        type: USER_LOGIN,
                        payload: {
                            login: json
                        }
                    })
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                } else {
                    Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const getSeenCount = async (userId) => {
    let api
    try {
        api = await fetch(baseUrl + seenCount, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getAnimalSeenList = async (userId) => {
    let api
    try {
        api = await fetch(baseUrl + animalSeenList, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getPeciosSeenList = async (userId) => {
    let api
    try {
        api = await fetch(baseUrl + peciosSeenList, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json
                } else {
                    console.log(json)
                    //Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getCountryName = () => {
    return dispatch => {
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(country_url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                //console.log(json)
                if (json.error == false) {
                    dispatch({
                        type: COUNTRY_NAME,
                        payload: {
                            countryData: json.data
                        }
                    })
                } else {
                    Alert.alert("", json.error)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const postPeciosImg = (userId, pecioId, image) => {
    return dispatch => {
        const body = new FormData();
        body.append('userId', userId);
        body.append('pecioId', pecioId);
        body.append('image', image);
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + peciosImg, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: body
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(json)
                if (json.status == 200) {
                    Alert.alert("", json.message)
                } else if (json.status == 401) {
                    NavigationService.navigate('Subscription')
                } else {
                    Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const postGenerImg = (userId, genreId, image) => {
    return dispatch => {
        const body = new FormData();
        body.append('userId', userId);
        body.append('genreId', genreId);
        body.append('image', image);
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + generImg, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: body
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(json)
                if (json.status == 200) {
                    Alert.alert("", json.message)
                } else if (json.status == 401) {
                    NavigationService.navigate('Subscription')
                } else {
                    Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const getDiveCenters = async (
    userId,
    centers,
    pecios,
    genreEasy,
    genreMedium,
    genreDifficult,
    points,
    dives
) => {
    let api
    try {
        api = await fetch(baseUrl + getCenters, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                centers: centers,
                pecios: pecios,
                genreEasy: genreEasy,
                genreMedium: genreMedium,
                genreDifficult: genreDifficult,
                points: points,
                dives: dives
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getDiveCenterDetail = async (centerId, userId) => {
    let api
    try {
        api = await fetch(baseUrl + getCentersDetail, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                centerId: centerId,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    NavigationService.navigate("DiveCenter", {
                        data: json
                    })
                    return
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getGenreDetails = async (genreId, userId) => {
    let api
    try {
        api = await fetch(baseUrl + getGenreDetail, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                genreId: genreId,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    NavigationService.navigate('Detail', {
                        data: json.data,
                        position: 0
                    })
                    return
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getPecioDetails = async (pecioId, userId) => {
    let api
    try {
        api = await fetch(baseUrl + getPecioDetail, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                pecioId: pecioId,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    NavigationService.navigate("PeciosDetail", {
                        data: json.data,
                        position: 0
                    })
                    return
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getPointsDetails = async (pointId, userId) => {
    let api
    try {
        api = await fetch(baseUrl + getPointDetail, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                pointId: pointId,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    NavigationService.navigate("NewScreen", {
                        data: json.data
                    })
                    return
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getDivesDetails = async (diveId, userId) => {
    console.log(diveId)
    let api
    try {
        api = await fetch(baseUrl + getDiveDetail, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                diveId: diveId,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    NavigationService.navigate("UpdateLogBook", {
                        data: json.data
                    })
                    return
                } else {
                    //console.log(json)
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const submitDiveCenterRanking = async (userId, centerId, stars, comment) => {
    let api
    try {
        api = await fetch(baseUrl + submitRating, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                centerId: centerId,
                stars: stars,
                comment: comment,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    Alert.alert("", json.message)
                    //NavigationService.navigate("DiveCenter")
                    return
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getAllList = async (userId) => {
    let api
    try {
        api = await fetch(baseUrl + getListAll, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    //console.log(json)
                    return json
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const postPeciosList = async (userId, pecioId, value) => {
    console.log(value)
    let api
    try {
        api = await fetch(baseUrl + submitinlistpecio, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                pecioId: pecioId,
                value: value,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    //console.log(json)
                    return json
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const postGenreList = async (userId, genreId, value) => {
    console.log(value)
    let api
    try {
        api = await fetch(baseUrl + submitinlistgenre, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                genreId: genreId,
                value: value,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    //console.log(json)
                    return json
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const postFriendList = async (userId, friendId, value) => {
    console.log(value)
    let api
    try {
        api = await fetch(baseUrl + submitinlistfriend, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                friendId: friendId,
                value: value,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    //console.log(json)
                    return json
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const submitFcmToken = async (fcm, userId) => {
    console.log(fcm, userId)
    let api
    try {
        api = await fetch(baseUrl + fcmToken, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                fcm: fcm,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    //console.log(json)
                    return json
                } else {
                    console.log('===> 1', json)
                    //Alert.alert("====> 1", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const userNotification = async (userId) => {
    let api
    try {
        api = await fetch(baseUrl + getNotifications, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const logoutUser = async (userId) => {
    let api
    try {
        api = await fetch(baseUrl + userLogout, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const searchList = async (searchText, userId) => {
    let api
    try {
        api = await fetch(baseUrl + search, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                search: searchText,
                userId: userId
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const postLogbookImg = async (image) => {
    let api
    const body = new FormData();
    body.append('image', image);
    try {
        api = await fetch(baseUrl + getPath, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: body
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const submitLogbookData = async (
    country,
    city,
    immersionSite,
    myDate,
    myTime,
    location,
    imagePath,
    weatherCode,
    temperature,
    visibility,
    waterType,
    startingBar,
    endBar,
    StartTime,
    EndTime,
    maxDeep,
    typeImpresion,
    suitCode,
    suitCode78,
    isScuba,
    isRebreader,
    isJacket,
    isWing,
    is12,
    is15,
    isSteel,
    isAluminum,
    isAir,
    isNitrox,
    oxygen,
    diveItem1,
    diveItem2,
    diveItem3,
    diveItem4,
    diveItem5,
    diveItem6,
    diveItem7,
    diveItem8,
    pecios,
    genres,
    users,
    center,
    centerId,
    opinion,
    userId,
    // new values
    poblation,
    type,
    current,
    access,
    ballast,
    bottles,
    material,
    mix,
    trimMix1,
    trimMix2,
    timeDiff,
    centerTexts
) => {
    let api
    try {
        api = await fetch(baseUrl + storeDive, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                country: country,
                city: city,
                immersionSite: immersionSite,
                date: myDate,
                time: myTime,
                location: location,
                image: imagePath,
                weather: weatherCode,
                temperature: temperature,
                visibility: visibility,
                waterType: waterType,
                startBar: startingBar,
                endBar: endBar,
                startTime: StartTime,
                endTime: EndTime,
                maxDeep: maxDeep,
                typeImpresion: typeImpresion,
                suitCode: suitCode,
                suitCode78: suitCode78,
                scuba: isScuba,
                rebreader: isRebreader,
                jacket: isJacket,
                wings: isWing,
                bottle12L: is12,
                bottle15L: is15,
                steel: isSteel,
                aluminum: isAluminum,
                air: isAir,
                nitrox: isNitrox,
                oxygen: oxygen,
                diveItem1: diveItem1,
                diveItem2: diveItem2,
                diveItem3: diveItem3,
                diveItem4: diveItem4,
                diveItem5: diveItem5,
                diveItem6: diveItem6,
                diveItem7: diveItem7,
                diveItem8: diveItem8,
                pecios: pecios,
                animal: genres,
                team: users,
                center: center,
                centerId: centerId,
                opinion: opinion,
                userId: userId,
                poblation: poblation,
                type: type,
                current: current,
                access: access,
                ballast: ballast,
                bottles: bottles,
                material: material,
                mix: mix,
                trimMix1: trimMix1,
                trimMix2: trimMix2,
                timeDiff: timeDiff,
                centerTexts: centerTexts,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    NavigationService.navigate("Home")
                    Alert.alert("", json.message)
                    return
                } else if (json.status == 401) {
                    NavigationService.navigate('Subscription')
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const updateLogbookData = async (
    country,
    city,
    immersionSite,
    myDate,
    myTime,
    location,
    imagePath,
    weatherCode,
    temperature,
    visibility,
    waterType,
    startingBar,
    endBar,
    StartTime,
    EndTime,
    maxDeep,
    typeImpresion,
    suitCode,
    suitCode78,
    isScuba,
    isRebreader,
    isJacket,
    isWing,
    is12,
    is15,
    isSteel,
    isAluminum,
    isAir,
    isNitrox,
    oxygen,
    diveItem1,
    diveItem2,
    diveItem3,
    diveItem4,
    diveItem5,
    diveItem6,
    diveItem7,
    diveItem8,
    pecios,
    genres,
    users,
    center,
    centerId,
    opinion,
    userId,
    diveId,
    // new values
    poblation,
    type,
    current,
    access,
    ballast,
    bottles,
    material,
    mix,
    trimMix1,
    trimMix2,
    timeDiff,
    centerTexts
) => {
    let api
    try {
        api = await fetch(baseUrl + updateDive, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                country: country,
                city: city,
                immersionSite: immersionSite,
                date: myDate,
                time: myTime,
                location: location,
                image: imagePath,
                weather: weatherCode,
                temperature: temperature,
                visibility: visibility,
                waterType: waterType,
                startBar: startingBar,
                endBar: endBar,
                startTime: StartTime,
                endTime: EndTime,
                maxDeep: maxDeep,
                typeImpresion: typeImpresion,
                suitCode: suitCode,
                suitCode78: suitCode78,
                scuba: isScuba,
                rebreader: isRebreader,
                jacket: isJacket,
                wings: isWing,
                bottle12L: is12,
                bottle15L: is15,
                steel: isSteel,
                aluminum: isAluminum,
                air: isAir,
                nitrox: isNitrox,
                oxygen: oxygen,
                diveItem1: diveItem1,
                diveItem2: diveItem2,
                diveItem3: diveItem3,
                diveItem4: diveItem4,
                diveItem5: diveItem5,
                diveItem6: diveItem6,
                diveItem7: diveItem7,
                diveItem8: diveItem8,
                pecios: pecios,
                animal: genres,
                team: users,
                center: center,
                centerId: centerId,
                opinion: opinion,
                userId: userId,
                diveId: diveId,
                poblation: poblation,
                type: type,
                current: current,
                access: access,
                ballast: ballast,
                bottles: bottles,
                material: material,
                mix: mix,
                trimMix1: trimMix1,
                trimMix2: trimMix2,
                timeDiff: timeDiff,
                centerTexts: centerTexts,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    NavigationService.navigate("Home")
                    Alert.alert("", json.message)
                    return
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getUserDives = async (userId) => {
    console.log(userId)
    let api
    try {
        api = await fetch(baseUrl + getDives, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getUserScore = async (userId) => {
    console.log(userId)
    let api
    try {
        api = await fetch(baseUrl + getScore, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json
                } else {
                    Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const sendUserLanguage = async (userId, lang) => {
    console.log("my current language is", lang)
    let api
    try {
        api = await fetch(baseUrl + setLanguages, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                lang: lang,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    //Alert.alert("", json.message)
                } else {
                    console.log('====> 2', json)
                    //Alert.alert("", json.message)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getUserCertificate = async () => {
    let api
    try {
        api = await fetch(baseUrl + getCertificates, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json;
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getUserDegree = async (characterId) => {
    let api
    try {
        api = await fetch(baseUrl + getDegrees, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                characterId: characterId
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json;
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const updateDegrees = (userId, certificate, degree) => {
    return dispatch => {
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + updateCertificateDegree, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                certificate: certificate,
                degree: degree,
            })
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(json)
                if (json.status == 200) {
                    dispatch({
                        type: USER_LOGIN,
                        payload: {
                            login: json
                        }
                    })
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                } else {
                    Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const deleteUserNotification = async (userId, notificationId) => {
    let api
    try {
        api = await fetch(baseUrl + deleteNotification, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                notificationId: notificationId
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return json;
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const updatePassword = async (userId, oldPassword, newPassword) => {
    let api
    try {
        api = await fetch(baseUrl + changePassword, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                oldPassword: oldPassword,
                newPassword: newPassword
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    Alert.alert("", json.message)
                    console.log(json)
                    NavigationService.navigate("Home")
                    return json;
                } else {
                    Alert.alert("", json.message)
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const eraseData = async (userId) => {
    let api
    try {
        api = await fetch(baseUrl + erase, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    NavigationService.navigate("LogBook")
                    return json;
                } else {
                    Alert.alert("", json.message)
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const deleteUploadImage = async (userId, uploadId) => {
    let api
    try {
        api = await fetch(baseUrl + deleteUpload, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                uploadId: uploadId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const deleteUserDives = async (userId, diveId) => {
    console.log("my dive is is", diveId)
    let api
    try {
        api = await fetch(baseUrl + deleteDive, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                diveId: diveId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    return
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const sendEmailToUser = async (email) => {
    console.log("my dive is is", email)
    let api
    try {
        api = await fetch(baseUrl + sendMail, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    console.log(json)
                    // NavigationService.navigate('UpdatePassword')
                    return json
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const updateNewPassword = async (email, password) => {
    console.log("my dive is is", email)
    let api
    try {
        api = await fetch(baseUrl + changePasswordNew, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    Alert.alert('', json.message)
                    NavigationService.navigate('Login')
                    return
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}

export const getAllSelectedGenre = async (userId) => {
    let api
    try {
        api = await fetch(baseUrl + getSelectedGenres, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    //console.log(json.genres)
                    return json.genres
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}

export const getAllSelectedPecios = async (userId) => {
    let api
    try {
        api = await fetch(baseUrl + getSelectedPecios, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    //console.log(json.pecios)
                    return json.pecios
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}

export const getAllSelectedUsers = async (userId) => {
    let api
    try {
        api = await fetch(baseUrl + getSelectedUsers, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    //console.log(json.users)
                    return json.users
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}

export const getCategoryIndex = async (id, categoryId) => {
    let api
    try {
        api = await fetch(baseUrl + getIndex, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                categoryId: categoryId
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    //console.log(json.users)
                    return json
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api

}
export const getPeciosIndex = async (id) => {
    let api
    try {
        api = await fetch(baseUrl + getIndex2, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status == 200) {
                    //console.log(json.users)
                    return json
                } else {
                    console.log(json)
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
    
}




import {  AsyncStorage, Alert } from "react-native";
import { Toast } from "native-base";
import Root from '../../root/Url';
import { NavigationActions } from "react-navigation";

export function itemsHasErrored(bool: boolean) {
  return {
    type: "ITEMS_HAS_ERRORED",
    hasErrored: bool
  };
}

export function itemsIsLoading(bool: boolean) {
  return {
    type: "ITEMS_IS_LOADING",
    isLoading: bool
  };
}

export function spinnerIsLogin(bool: boolean) {
  return {
    type: "SPINNER_LOGIN",
    isSpinLogin: bool
  };
}

export function isLogin(bool: boolean) {
  return {
    type: "IS_LOGIN",
    isLogin: bool
  };
}

export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "ITEMS_FETCH_DATA_SUCCESS",
    items
  };
}

export function itemsFetchData(url: any) {
  return dispatch => {
    dispatch(itemsFetchDataSuccess((url: any)));
    dispatch(itemsIsLoading(false));
    dispatch(spinnerIsLogin(false));
    dispatch(isLogin(true));
  };
}

export function loginUser(email, password) {
  return dispatch => {
    return fetch(Root.link + 'auth/login', {
        method: 'POST',
        headers: {
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          'email' : email,
          'password' : password,
          'remember_me' : true
        }),
      })
      .then(response => response.json())
      .then((responseJson) => {
        try{
          // console.warn(JSON.stringify(responseJson));
          var obj = responseJson;
          if(obj.success){
            var data = {
              username : email,
              access_token : obj.access_token,
              token_type : obj.token_type
            }
            AsyncStorage.setItem('session_user',JSON.stringify(data));
            dispatch(itemsFetchData(data));
            NavigationActions.navigate.dispatch(home);
          }else{
            dispatch(itemsIsLoading(false));
            dispatch(spinnerIsLogin(false));
            Toast.show({
              text: "Username atau kata sandi salah!",
              duration: 2500,
              position: "top",
              style:{ backgroundColor: '#d9534f' },
              textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
            });
          }
        }catch(err){
          console.log(err.message + " Error");
          dispatch(itemsIsLoading(false));
          dispatch(spinnerIsLogin(false));
        }
      }).catch(function(err) {
          dispatch(itemsIsLoading(false));
          dispatch(spinnerIsLogin(false));
          console.log(err.message + " Error");
      }).done();
  };
}

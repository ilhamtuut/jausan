import {  AsyncStorage, Alert } from "react-native";
import { Toast } from "native-base";
import Root from '../../root/Url';

export function itemsHasErrored(bool: boolean) {
  return {
    type: "ITEMS_HAS_ERRORED_REGISTER",
    hasErroredRegister: bool
  };
}

export function itemsIsLoading(bool: boolean) {
  return {
    type: "ITEMS_IS_LOADING_REGISTER",
    isLoadingRegister: bool
  };
}

export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "ITEMS_FETCH_DATA_SUCCESS_REGISTER",
    itemsRegister: items
  };
}

export function itemsFetchData(url: any) {
  return dispatch => {
    dispatch(itemsFetchDataSuccess((url: any)));
    dispatch(itemsIsLoading(false));
  };
}

export function registerUser(params) {
  return dispatch => {
    dispatch(itemsIsLoading(true));
    return fetch(Root.link + 'register', {
        method: 'POST',
        headers: {
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(params),
      })
      .then(response => response.json())
      .then((responseJson) => {
        try{
          var obj = responseJson;
          if(obj.token_type == "Bearer"){
            var data = {
              token_type : obj.token_type,
              access_token : obj.access_token,
              refresh_token : obj.refresh_token
            }
            AsyncStorage.setItem('session_user',JSON.stringify(data));
            global.access_token = obj.access_token;
            dispatch(itemsFetchData(data));
            console.warn(JSON.stringify(responseJson));
          }else{
            dispatch(itemsIsLoading(false));
            if(responseJson.errors){
              var errors = responseJson.errors;
              var mnik = '';
              var mname = '';
              var malamat = '';
              var mtelepon = '';
              var memail = '';
              var mphoto_diri = '';
              var mphoto_ktp = '';
              var mcabang_id = '';
              var mpassword = '';

              if(errors.nik){
                mnik = errors.nik[0] + "\n";
              }

              if(errors.name){
                mname = errors.name[0] + "\n";
              }

              if(errors.alamat){
                malamat = errors.alamat[0] + "\n";
              }

              if(errors.telepon){
                mtelepon = errors.telepon[0] + "\n";
              }

              if(errors.email){
                memail = errors.email[0] + "\n";
              }

              if(errors.cabang_id){
                mcabang_id = errors.cabang_id[0] + "\n";
              }

              if(errors.photo_diri){
                mphoto_diri = errors.photo_diri[0] + "\n";
              }

              if(errors.photo_ktp){
                mphoto_ktp = errors.photo_ktp[0] + "\n";
              }

              if(errors.password){
                mpassword = errors.password[0];
              }

              var msg = mnik + " " + mname + " " + malamat + " " + mtelepon + " " + memail + " " + mcabang_id + " " + mphoto_diri + " " + mphoto_ktp + " " + mpassword;
              Toast.show({
                text: msg,
                duration: 2500,
                position: "bottom",
                style:{ backgroundColor: '#d9534f' },
                textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
              });
            }else{
              Toast.show({
                text: "Gagal Registrasi!",
                duration: 2500,
                position: "top",
                style:{ backgroundColor: '#d9534f' },
                textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
              });
            }
          }
        }catch(err){
          console.log(err.message + " Error");
        }
      }).catch(function(err) {
          console.log(err.message + " Error");
      }).done();
  };
}

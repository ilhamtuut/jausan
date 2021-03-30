import Root from '../../root/Url';
import { Toast } from "native-base";
export function itemsHasErroredFormulir(bool: boolean) {
  return {
    type: "FORMULIR_ITEMS_HAS_ERRORED",
    hasErroredFormulir: bool
  };
}
export function itemsIsLoadingFormulir(bool: boolean) {
  return {
    type: "FORMULIR_ITEMS_IS_LOADING",
    isLoadingFormulir: bool
  };
}
export function itemsFetchDataSuccessFormulir(items: Object) {
  return {
    type: "FORMULIR_ITEMS_FETCH_DATA_SUCCESS",
    dataFormulir: items
  };
}
export function itemsFetchDataFormulir(url: any) {
  return dispatch => {
    dispatch(itemsFetchDataSuccessFormulir((url: any)));
    dispatch(itemsIsLoadingFormulir(false));
  };
}

export function register(email, password) {
  return dispatch => {
    dispatch(itemsIsLoading(true));
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
          console.warn(JSON.stringify(responseJson));
          var obj = responseJson;
          if(obj.success){
            dispatch(itemsFetchDataFormulir(data));
          }else{
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
        }
      }).catch(function(err) {
          console.log(err.message + " Error");
      }).done();
  };
}
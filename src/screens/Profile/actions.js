import Root from '../../root/Url';
import { Toast } from "native-base";
import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
export function itemsHasErrored(bool: boolean) {
  return {
    type: "PROFILE_ITEMS_HAS_ERRORED",
    hasErrored: bool
  };
}
export function itemsIsLoading(bool: boolean) {
  return {
    type: "PROFILE_ITEMS_IS_LOADING",
    isLoading: bool
  };
}
export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "PROFILE_ITEMS_FETCH_DATA_SUCCESS",
    items
  };
}
export function itemsFetchData(url: any) {
  return dispatch => {
    dispatch(itemsFetchDataSuccess((url: any)));
    dispatch(itemsIsLoading(false));
  };
}

export function fetchDataUser() {
  return dispatch => {
    return fetch(Root.link + 'profil', {
        method: 'GET',
        headers: {
          'Accept' : 'application/json', 
          'Authorization' : 'Bearer ' + global.access_token
        },
      })
      .then(response => response.json())
      .then((responseJson) => {
        console.warn(JSON.stringify(responseJson));
        try{
          var obj = responseJson;
          if(obj.success){
            dispatch(itemsFetchData(obj.data));
          }else{
            AsyncStorage.clear();
            dispatch(itemsIsLoading(false));
          }
        }catch(err){
          console.log(err.message + " Error");
          dispatch(itemsIsLoading(false));
        }
      }).catch(function(err) {
          dispatch(itemsIsLoading(false));
          console.log(err.message + " Error");
      }).done();
  };
}
import Root from '../../../root/Url';
import { Toast } from "native-base";
export function itemsHasErrored(bool: boolean) {
  return {
    type: "KONSULTASI_ITEMS_HAS_ERRORED",
    hasErroredKonsultasi: bool
  };
}
export function itemsIsLoading(bool: boolean) {
  return {
    type: "KONSULTASI_ITEMS_IS_LOADING",
    isLoadingKonsultasi: bool
  };
}
export function itemsIsModal(bool: boolean) {
  return {
    type: "KONSULTASI_MODAL",
    isModalKonsultasi: bool
  };
}
export function itemsRemove(items: Object) {
  return {
    type: "KONSULTASI_REMOVE_ITEMS",
    itemKonsultasi: []
  };
}
export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "KONSULTASI_ITEMS_FETCH_DATA_SUCCESS",
    itemKonsultasi: items
  };
}
export function itemsFetchData(url: any) {
  return dispatch => {
    dispatch(itemsFetchDataSuccess((url: any)));
    dispatch(itemsIsLoading(false));
    dispatch(itemsIsModal(false));
  };
}

export function fetchData(page) {
  return dispatch => {
    return fetch(Root.link + 'konsultasi?page='+page, {
        method: 'GET',
        headers: {
          'Accept' : 'application/json'
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.warn(JSON.stringify(responseJson))
        try{
          if(responseJson.success){
            dispatch(itemsFetchData(responseJson.data));
          }else{
            dispatch(itemsRemove([]));
            var msg =" Gagal Mengambil Data";
            Toast.show({
              text: msg,
              duration: 2500,
              position: "bottom",
              style:{ backgroundColor: '#d9534f' },
              textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
            });
          }
        }catch(err){
          console.log(err.message + " Error");
          dispatch(itemsIsLoading(false));
          dispatch(itemsIsModal(false));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
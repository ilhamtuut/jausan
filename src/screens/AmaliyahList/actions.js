import Root from '../../root/Url';
import { Toast } from "native-base";
export function itemsHasErrored(bool: boolean) {
  return {
    type: "AMALIYAHLIST_ITEMS_HAS_ERRORED",
    hasErroredAmaliyahList: bool
  };
}
export function itemsIsLoading(bool: boolean) {
  return {
    type: "AMALIYAHLIST_ITEMS_IS_LOADING",
    isLoadingAmaliyahList: bool
  };
}
export function itemsIsModal(bool: boolean) {
  return {
    type: "AMALIYAHLIST_MODAL",
    isModalAmaliyahList: bool
  };
}
export function isRefresh(bool: boolean) {
  return {
    type: "AMALIYAHLIST_ITEMS_REFRESH",
    isRefreshList: bool
  };
}
export function itemsRemove(items: Object) {
  return {
    type: "AMALIYAHLIST_REMOVE_ITEMS",
    itemAmaliyahList: []
  };
}
export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "AMALIYAHLIST_ITEMS_FETCH_DATA_SUCCESS",
    itemAmaliyahList: items
  };
}
export function itemsFetchData(url: any) {
  return dispatch => {
    dispatch(itemsFetchDataSuccess((url: any)));
    dispatch(itemsIsLoading(false));
    dispatch(itemsIsModal(false));
    dispatch(isRefresh(false));
  };
}

export function fetchData(url) {
  return dispatch => {
    return fetch(url, {
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
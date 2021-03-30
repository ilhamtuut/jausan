import Root from '../../../root/Url';
import { Toast } from "native-base";
export function itemsHasErrored(bool: boolean) {
  return {
    type: "TOKOH_ITEMS_HAS_ERRORED",
    hasErroredTokoh: bool
  };
}
export function itemsIsLoading(bool: boolean) {
  return {
    type: "TOKOH_ITEMS_IS_LOADING",
    isLoadingTokoh: bool
  };
}
export function itemsIsModal(bool: boolean) {
  return {
    type: "TOKOH_MODAL",
    isModalTokoh: bool
  };
}
export function itemsIsRefresh(bool: boolean) {
  return {
    type: "TOKOH_REFRESH",
    refreshing: bool
  };
}
export function itemsRemove(items: Object) {
  return {
    type: "TOKOH_REMOVE_ITEMS",
    itemTokoh: []
  };
}
export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "TOKOH_ITEMS_FETCH_DATA_SUCCESS",
    itemTokoh: items
  };
}
export function itemsFetchData(url: any) {
  return dispatch => {
    dispatch(itemsFetchDataSuccess((url: any)));
    dispatch(itemsIsLoading(false));
    dispatch(itemsIsModal(false));
    dispatch(itemsIsRefresh(false));
  };
}

export function fetchData(page) {
  return dispatch => {
    return fetch(Root.link + 'kyaiku?page='+page, {
        method: 'GET',
        headers: {
          'Accept' : 'application/json'
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
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
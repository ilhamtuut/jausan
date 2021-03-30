import Root from '../../root/Url';
import { Toast } from "native-base";
export function itemsHasErrored(bool: boolean) {
  return {
    type: "AMALIYAH_ITEMS_HAS_ERRORED",
    hasErroredAmaliyah: bool
  };
}
export function itemsIsLoading(bool: boolean) {
  return {
    type: "AMALIYAH_ITEMS_IS_LOADING",
    isLoadingAmaliyah: bool
  };
}
export function itemsIsModal(bool: boolean) {
  return {
    type: "AMALIYAH_MODAL",
    isModalAmaliyah: bool
  };
}
export function isRefresh(bool: boolean) {
  return {
    type: "AMALIYAH_ITEMS_REFRESH",
    isRefreshAmaliyah: bool
  };
}
export function itemsRemove(items: Object) {
  return {
    type: "AMALIYAH_REMOVE_ITEMS",
    itemAmaliyah: []
  };
}
export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "AMALIYAH_ITEMS_FETCH_DATA_SUCCESS",
    itemAmaliyah: items
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

export function fetchData(page) {
  return dispatch => {
    return fetch(Root.link + 'category?page='+page, {
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
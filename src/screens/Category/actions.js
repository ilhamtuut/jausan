import Root from '../../root/Url';
import { Toast } from "native-base";
export function itemsHasErrored(bool: boolean) {
  return {
    type: "LAPORAN_ITEMS_HAS_ERRORED",
    hasErrored: bool
  };
}
export function itemsIsLoading(bool: boolean) {
  return {
    type: "LAPORAN_ITEMS_IS_LOADING",
    isLoading: bool
  };
}
export function itemsIsModal(bool: boolean) {
  return {
    type: "LAPORAN_MODAL",
    isModal: bool
  };
}
export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "LAPORAN_ITEMS_FETCH_DATA_SUCCESS",
    items
  };
}
export function itemsFetchData(url: any) {
  return dispatch => {
    dispatch(itemsFetchDataSuccess((url: any)));
    dispatch(itemsIsLoading(false));
    dispatch(itemsIsModal(false));
  };
}

export function fetchDataAbsen() {
  return dispatch => {
    return fetch(Root.link_news + 'categories?per_page=100', {
        method: 'GET',
        headers: {
          'Accept' : 'application/json'
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch(itemsFetchData(responseJson));
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
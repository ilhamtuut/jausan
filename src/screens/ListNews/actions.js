import Root from '../../root/Url';
import { Toast } from "native-base";
export function itemsHasErrored(bool: boolean) {
  return {
    type: "LIST_ITEMS_HAS_ERRORED",
    hasErrored: bool
  };
}
export function itemsIsLoading(bool: boolean) {
  return {
    type: "LIST_ITEMS_IS_LOADING",
    isLoading: bool
  };
}
export function itemsIsModal(bool: boolean) {
  return {
    type: "LIST_MODAL",
    isModal: bool
  };
}
export function itemsRemove(items: Object) {
  return {
    type: "REMOVE_ITEMS",
    items: []
  };
}
export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "LIST_ITEMS_FETCH_DATA_SUCCESS",
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
        // console.warn(JSON.stringify(responseJson));
        dispatch(itemsFetchData(responseJson));
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
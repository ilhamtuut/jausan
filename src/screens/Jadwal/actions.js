import Root from '../../root/Url';
import { Toast } from "native-base";
export function itemsHasErrored(bool: boolean) {
  return {
    type: "JADWAL_ITEMS_HAS_ERRORED",
    hasErrored: bool
  };
}
export function itemsIsLoading(bool: boolean) {
  return {
    type: "JADWAL_ITEMS_IS_LOADING",
    isLoading: bool
  };
}
export function itemsIsModalView(bool: boolean) {
  return {
    type: "JADWAL_ITEMS_IS_LOADING",
    isModalView: bool
  };
}
export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "JADWAL_ITEMS_FETCH_DATA_SUCCESS",
    items
  };
}
export function itemsFetchData(url: any) {
  return dispatch => {
    dispatch(itemsFetchDataSuccess((url: any)));
    dispatch(itemsIsLoading(false));
  };
}
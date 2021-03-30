export function itemsHasErrored(bool: boolean) {
  return {
    type: "ITEMS_HAS_ERRORED_PASSWORD",
    hasErrored: bool
  };
}

export function itemsIsLoading(bool: boolean) {
  return {
    type: "ITEMS_IS_LOADING_PASSWORD",
    isLoading: bool
  };
}

export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "ITEMS_FETCH_DATA_SUCCESS_PASSWORD",
    items
  };
}

export function itemsFetchData(url: any) {
  return dispatch => {
    dispatch(itemsFetchDataSuccess((url: any)));
    dispatch(itemsIsLoading(false));
  };
}
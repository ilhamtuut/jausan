export function itemsHasErroredEditProfile(bool: boolean) {
  return {
    type: "ITEMS_HAS_ERRORED_EDIT_PROFILE",
    hasErrored: bool
  };
}

export function itemsIsLoadingEditProfile(bool: boolean) {
  return {
    type: "ITEMS_IS_LOADING_EDIT_PROFILE",
    isLoading: bool
  };
}

export function itemsFetchDataSuccessEditProfile(items: Object) {
  return {
    type: "ITEMS_FETCH_DATA_SUCCESS_EDIT_PROFILE",
    items
  };
}

export function itemsFetchDataEditProfile(url: any) {
  return dispatch => {
    dispatch(itemsFetchDataSuccessEditProfile((url: any)));
    dispatch(itemsIsLoadingEditProfile(false));
  };
}
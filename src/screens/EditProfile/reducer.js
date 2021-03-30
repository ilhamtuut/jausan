const initialState = {
  isLoading: false,
  hasErrored: false,
  items: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "ITEMS_HAS_ERRORED_EDIT_PROFILE":
      return { ...state, hasErrored: action.hasErrored };
    case "ITEMS_IS_LOADING_EDIT_PROFILE":
      return { ...state, isLoading: action.isLoading };
    case "ITEMS_FETCH_DATA_SUCCESS_EDIT_PROFILE":
      return { ...state, items: action.items };
    default:
      return state;
  }
}
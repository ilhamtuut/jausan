const initialState = {
  isLoading: false,
  hasErrored: false,
  items: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "ITEMS_HAS_ERRORED_PASSWORD":
      return { ...state, hasErrored: action.hasErrored };
    case "ITEMS_IS_LOADING_PASSWORD":
      return { ...state, isLoading: action.isLoading };
    case "ITEMS_FETCH_DATA_SUCCESS_PASSWORD":
      return { ...state, items: action.items };
    default:
      return state;
  }
}
const initialState = {
  isLoading: true,
  hasErrored: false,
  items: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "NEWS_ITEMS_HAS_ERRORED":
      return { ...state, hasErrored: action.hasErrored };
    case "NEWS_ITEMS_IS_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "NEWS_ITEMS_FETCH_DATA_SUCCESS":
      return { ...state, items: action.items };
    default:
      return state;
  }
}
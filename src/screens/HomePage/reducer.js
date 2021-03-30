const initialState = {
  isLoading: true,
  hasErrored: false,
  items: [],
  news: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "HOME_ITEMS_HAS_ERRORED":
      return { ...state, hasErrored: action.hasErrored };
    case "HOME_ITEMS_IS_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "HOME_ITEMS_FETCH_DATA_SUCCESS":
      return { ...state, items: action.items };
    case "HOME_NEWS_FETCH_DATA_SUCCESS":
      return { ...state, news: action.news };
    default:
      return state;
  }
}
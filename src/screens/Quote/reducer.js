const initialState = {
  isLoadingQuote: true,
  hasErroredQuote: false,
  isModalQuote: false,
  isRefreshQuote: false,
  itemQuote: [],
  perPage: 0,
  totalData: 0,
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "QUOTE_REMOVE_ITEMS":
      return { ...state, itemQuote: [] };
    case "QUOTE_ITEMS_REFRESH":
      return { ...state, isRefreshQuote: action.isRefreshQuote };
    case "QUOTE_ITEMS_HAS_ERRORED":
      return { ...state, hasErroredQuote: action.hasErroredQuote };
    case "QUOTE_ITEMS_IS_LOADING":
      return { ...state, isLoadingQuote: action.isLoadingQuote };
    case "QUOTE_MODAL":
      return { ...state, isModalQuote: action.isModalQuote };
    case "QUOTE_ITEMS_FETCH_DATA_SUCCESS":
      return { 
        ...state, 
        itemQuote: [...state.itemQuote, ...action.itemQuote.data],
        perPageList: action.itemQuote.per_page, 
        totalData: action.itemQuote.total
      };
    default:
      return state;
  }
}
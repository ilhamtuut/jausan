const initialState = {
  isLoadingRetail: true,
  hasErroredRetail: false,
  isModalRetail: false,
  isRefreshRetail: false,
  itemRetail: [],
  perPageRetail: 0,
  totalDataRetail: 0,
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "RETAIL_REMOVE_ITEMS":
      return { ...state, itemRetail: [] };
    case "RETAIL_ITEMS_HAS_ERRORED":
      return { ...state, hasErroredRetail: action.hasErroredRetail };
    case "RETAIL_REFRESH":
      return { ...state, refreshing: action.refreshing };
    case "RETAIL_ITEMS_IS_LOADING":
      return { ...state, isLoadingRetail: action.isLoadingRetail };
    case "RETAIL_MODAL":
      return { ...state, isModalRetail: action.isModalRetail };
    case "RETAIL_ITEMS_FETCH_DATA_SUCCESS":
      return { 
        ...state, 
        itemRetail: [...state.itemRetail, ...action.itemRetail.data],
        perPageRetail: action.itemRetail.per_page, 
        totalDataRetail: action.itemRetail.total
      };
    default:
      return state;
  }
}
const initialState = {
  isLoadingNgaji: true,
  hasErroredNgaji: false,
  isModalNgaji: false,
  isRefreshNgaji: false,
  itemNgaji: [],
  perPageNgaji: 0,
  totalDataNgaji: 0
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "NGAJI_REMOVE_ITEMS":
      return { ...state, itemNgaji: [] };
    case "NGAJI_ITEMS_HAS_ERRORED":
      return { ...state, hasErroredNgaji: action.hasErroredNgaji };
    case "NGAJI_ITEMS_REFRESH":
      return { ...state, isRefreshNgaji: action.isRefreshNgaji };
    case "NGAJI_ITEMS_IS_LOADING":
      return { ...state, isLoadingNgaji: action.isLoadingNgaji };
    case "NGAJI_MODAL":
      return { ...state, isModalNgaji: action.isModalNgaji };
    case "NGAJI_ITEMS_FETCH_DATA_SUCCESS":
      return {
        ...state, 
        itemNgaji: [...state.itemNgaji, ...action.itemNgaji.data],
        perPageNgaji: action.itemNgaji.per_page, 
        totalDataNgaji: action.itemNgaji.total
      };
    default:
      return state;
  }
}
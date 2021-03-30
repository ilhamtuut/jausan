const initialState = {
  isLoadingTokoh: true,
  hasErroredTokoh: false,
  isModalTokoh: false,
  refreshing: false,
  itemTokoh: [],
  perPage: 0,
  totalData: 0,
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "TOKOH_REMOVE_ITEMS":
      return { ...state, itemTokoh: [] };
    case "TOKOH_ITEMS_HAS_ERRORED":
      return { ...state, hasErroredTokoh: action.hasErroredTokoh };
    case "TOKOH_REFRESH":
      return { ...state, refreshing: action.refreshing };
    case "TOKOH_ITEMS_IS_LOADING":
      return { ...state, isLoadingTokoh: action.isLoadingTokoh };
    case "TOKOH_MODAL":
      return { ...state, isModalTokoh: action.isModalTokoh };
    case "TOKOH_ITEMS_FETCH_DATA_SUCCESS":
      return { 
        ...state, 
        // itemTokoh: action.itemTokoh,
        itemTokoh: [...state.itemTokoh, ...action.itemTokoh.data],
        perPage: action.itemTokoh.per_page, 
        totalData: action.itemTokoh.total
      };
    default:
      return state;
  }
}
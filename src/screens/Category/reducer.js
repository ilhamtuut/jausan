const initialState = {
  isLoading: true,
  hasErrored: false,
  isModal: false,
  items: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "LAPORAN_ITEMS_HAS_ERRORED":
      return { ...state, hasErrored: action.hasErrored };
    case "LAPORAN_ITEMS_IS_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "LAPORAN_MODAL":
      return { ...state, isModal: action.isModal };
    case "LAPORAN_ITEMS_FETCH_DATA_SUCCESS":
      return { ...state, items: action.items };
    default:
      return state;
  }
}
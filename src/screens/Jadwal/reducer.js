const initialState = {
  isModalView: false,
  isLoading: true,
  hasErrored: false,
  items: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "JADWAL_ITEMS_HAS_ERRORED":
      return { ...state, hasErrored: action.hasErrored };
    case "JADWAL_ITEMS_IS_MODAL":
      return { ...state, isModalView: action.isModalView };
    case "JADWAL_ITEMS_IS_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "JADWAL_ITEMS_FETCH_DATA_SUCCESS":
      return { ...state, items: action.items };
    default:
      return state;
  }
}
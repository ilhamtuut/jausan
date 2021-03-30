const initialState = {
  isLoading: true,
  hasErrored: false,
  isModal: false,
  items: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "REMOVE_ITEMS":
      return { ...state, items: [] };
    case "LIST_ITEMS_HAS_ERRORED":
      return { ...state, hasErrored: action.hasErrored };
    case "LIST_ITEMS_IS_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "LIST_MODAL":
      return { ...state, isModal: action.isModal };
    case "LIST_ITEMS_FETCH_DATA_SUCCESS":
      return { ...state, items: [...state.items, ...action.items]};
    default:
      return state;
  }
}
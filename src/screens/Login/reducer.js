const initialState = {
  isSpinLogin:false,
  isLogin: false,
  isLoading: true,
  hasErrored: false,
  items: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "ITEMS_HAS_ERRORED":
      return { ...state, hasErrored: action.hasErrored };
    case "ITEMS_IS_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "IS_LOGIN":
      return { ...state, isLogin: action.isLogin };
    case "SPINNER_LOGIN":
      return { ...state, isSpinLogin: action.isSpinLogin };
    case "ITEMS_FETCH_DATA_SUCCESS":
      return { ...state, items: action.items };
    default:
      return state;
  }
}
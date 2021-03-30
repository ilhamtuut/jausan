const initialState = {
  isLoadingRegister: false,
  hasErroredRegister: false,
  itemsRegister: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "ITEMS_HAS_ERRORED_REGISTER":
      return { ...state, hasErroredRegister: action.hasErroredRegister };
    case "ITEMS_IS_LOADING_REGISTER":
      return { ...state, isLoadingRegister: action.isLoadingRegister };
    case "ITEMS_FETCH_DATA_SUCCESS_REGISTER":
      return { ...state, itemsRegister: action.itemsRegister };
    default:
      return state;
  }
}
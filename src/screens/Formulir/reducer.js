const initialState = {
  isLoadingFormulir: true,
  hasErroredFormulir: false,
  dataFormulir: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "IJIN_ITEMS_HAS_ERRORED":
      return { ...state, hasErroredFormulir: action.hasErroredFormulir };
    case "IJIN_ITEMS_IS_LOADING":
      return { ...state, isLoadingFormulir: action.isLoadingFormulir };
    case "IJIN_ITEMS_FETCH_DATA_SUCCESS":
      return { ...state, dataFormulir: action.dataFormulir };
    default:
      return state;
  }
}
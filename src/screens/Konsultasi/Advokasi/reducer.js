const initialState = {
  isLoadingKonsultasi: true,
  hasErroredKonsultasi: false,
  isModalKonsultasi: false,
  itemKonsultasi: [],
  perPage: 0,
  totalData: 0,
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "KONSULTASI_REMOVE_ITEMS":
      return { ...state, itemKonsultasi: [] };
    case "KONSULTASI_ITEMS_HAS_ERRORED":
      return { ...state, hasErroredKonsultasi: action.hasErroredKonsultasi };
    case "KONSULTASI_ITEMS_IS_LOADING":
      return { ...state, isLoadingKonsultasi: action.isLoadingKonsultasi };
    case "KONSULTASI_MODAL":
      return { ...state, isModalKonsultasi: action.isModalKonsultasi };
    case "KONSULTASI_ITEMS_FETCH_DATA_SUCCESS":
      return { 
        ...state, 
        // itemKonsultasi: action.itemKonsultasi.data, 
        itemKonsultasi: [...state.itemKonsultasi, ...action.itemKonsultasi.data],
        perPage: action.itemKonsultasi.per_page, 
        totalData: action.itemKonsultasi.total
      };
      // return { ...state, itemKonsultasi: [...state.itemKonsultasi, ...action.itemKonsultasi] };
    default:
      return state;
  }
}
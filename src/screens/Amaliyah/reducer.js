const initialState = {
  isLoadingAmaliyah: true,
  hasErroredAmaliyah: false,
  isModalAmaliyah: false,
  isRefreshAmaliyah: false,
  itemAmaliyah: [],
  perPage: 0,
  totalData: 0,
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "AMALIYAH_REMOVE_ITEMS":
      return { ...state, itemAmaliyah: [] };
    case "AMALIYAH_ITEMS_REFRESH":
      return { ...state, isRefreshAmaliyah: action.isRefreshAmaliyah };
    case "AMALIYAH_ITEMS_HAS_ERRORED":
      return { ...state, hasErroredAmaliyah: action.hasErroredAmaliyah };
    case "AMALIYAH_ITEMS_IS_LOADING":
      return { ...state, isLoadingAmaliyah: action.isLoadingAmaliyah };
    case "AMALIYAH_MODAL":
      return { ...state, isModalAmaliyah: action.isModalAmaliyah };
    case "AMALIYAH_ITEMS_FETCH_DATA_SUCCESS":
      return { 
        ...state, 
        itemAmaliyah: action.itemAmaliyah
        // itemAmaliyah: [...state.itemAmaliyah, ...action.itemAmaliyah]
      };
    default:
      return state;
  }
}
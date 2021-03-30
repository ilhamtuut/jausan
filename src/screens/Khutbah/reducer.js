const initialState = {
  isLoadingKhutbah: true,
  hasErroredKhutbah: false,
  isModalKhutbah: false,
  isRefreshKhutbah: false,
  itemKhutbah: [],
  perPage: 0,
  totalData: 0,
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "KHUTBAH_REMOVE_ITEMS":
      return { ...state, itemKhutbah: [] };
    case "KHUTBAH_ITEMS_REFRESH":
      return { ...state, isRefreshKhutbah: action.isRefreshKhutbah };
    case "KHUTBAH_ITEMS_HAS_ERRORED":
      return { ...state, hasErroredKhutbah: action.hasErroredKhutbah };
    case "KHUTBAH_ITEMS_IS_LOADING":
      return { ...state, isLoadingKhutbah: action.isLoadingKhutbah };
    case "KHUTBAH_MODAL":
      return { ...state, isModalKhutbah: action.isModalKhutbah };
    case "KHUTBAH_ITEMS_FETCH_DATA_SUCCESS":
      return { 
        ...state, 
        // itemAmaliyah: action.itemAmaliyah.data,
        itemKhutbah: [...state.itemKhutbah, ...action.itemKhutbah.data],
        perPage: action.itemKhutbah.per_page, 
        totalData: action.itemKhutbah.total
      };
    default:
      return state;
  }
}
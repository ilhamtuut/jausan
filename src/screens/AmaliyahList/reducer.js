const initialState = {
  isLoadingAmaliyahList: true,
  hasErroredAmaliyahList: false,
  isModalAmaliyahList: false,
  isRefreshList: false,
  itemAmaliyahList: [],
  perPageList: 0,
  totalDataList: 0,
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "AMALIYAHLIST_REMOVE_ITEMS":
      return { ...state, itemAmaliyahList: [] };
    case "AMALIYAHLIST_ITEMS_REFRESH":
      return { ...state, isRefreshList: action.isRefreshList };
    case "AMALIYAHLIST_ITEMS_HAS_ERRORED":
      return { ...state, hasErroredAmaliyahList: action.hasErroredAmaliyahList };
    case "AMALIYAHLIST_ITEMS_IS_LOADING":
      return { ...state, isLoadingAmaliyahList: action.isLoadingAmaliyahList };
    case "AMALIYAHLIST_MODAL":
      return { ...state, isModalAmaliyahList: action.isModalAmaliyahList };
    case "AMALIYAHLIST_ITEMS_FETCH_DATA_SUCCESS":
      return { 
        ...state, 
        // itemAmaliyah: action.itemAmaliyah.data,
        itemAmaliyahList: [...state.itemAmaliyahList, ...action.itemAmaliyahList.data],
        perPageList: action.itemAmaliyahList.per_page, 
        totalDataList: action.itemAmaliyahList.total
      };
    default:
      return state;
  }
}
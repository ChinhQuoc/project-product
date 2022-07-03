const initialState = { list: [], productDetail: {} };
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PAGINATION":
      return {
        ...state,
        list: action.payload
      };
    case "GET_DETAIL":
      return {
        ...state,
        productDetail: action.payload
      };
    default: {
      return {
        ...state
      };
    }
  }
}
export default productReducer;

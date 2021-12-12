import { GET_PRODUCTS_FAIL, GET_PRODUCTS_SUCCESS } from "../actions/types";
const initialState = {
  products: [],
  loading: true,
  error: null,
};
export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        products: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

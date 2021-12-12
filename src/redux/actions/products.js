import axios from "axios";
import { GET_PRODUCTS_FAIL, GET_PRODUCTS_SUCCESS } from "./types";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, payload: error.response.data.message });
  }
};

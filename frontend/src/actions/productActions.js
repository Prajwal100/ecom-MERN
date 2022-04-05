import axios from "axios";
import {
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCTS_REQUEST,
    });
    const { data } = await axios.get("/api/v1/products");
    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: e.response.data.message,
    });
  }
};

//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

import api from '../../utils/api';
import { IIngredient } from '../../utils/chema';

export const GET_ORDER: "GET_ORDER" = "GET_ORDER";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const REMOVE_ORDER: "REMOVE_ORDER" = "REMOVE_ORDER";

export function getOrder(ingredients: IIngredient[]) {
  // @ts-ignore
  return function(dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    api.postOrder(ingredients.map((item) => item._id))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res,
          });
        }
      })
      .catch(err =>
        dispatch({
          type: GET_ORDER_FAILED,
          err: err,
        })
      );
  };
}

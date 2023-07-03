import api from '../../utils/api';

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const INGREDIENT_INCREMENT = "INGREDIENT_INCREMENT";
export const INGREDIENT_DECREMENT = "INGREDIENT_DECREMENT";

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        api.getInitialIngredients()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data
                    });
                }})
            .catch(err => 
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                    err: err
                })
            )
    }
}
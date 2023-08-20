import { IIngredient } from '../../utils/chema';
import { ADD_INGREDIENT } from '../actions/burger-constructor';
import { ADD_INGREDIENT_FOR_DETAIL, REMOVE_INGREDIENT_FOR_DETAIL } from '../actions/ingredient-details';


interface IIngredientDetailState {
    selectIngredientForDetail: IIngredient | null;
}
  
export const ingredientDetailInitialState: IIngredientDetailState = {
    selectIngredientForDetail: null
};
  
export interface IAddIngredientForDetailAction {
    type: typeof ADD_INGREDIENT_FOR_DETAIL;
    ingredient: IIngredient;
}
  
export interface IRemoveIngredientForDetailAction {
    type: typeof REMOVE_INGREDIENT_FOR_DETAIL;
}
  
export type TIngredientDetailActions =
    | IAddIngredientForDetailAction
    | IRemoveIngredientForDetailAction;
  
export const addIngredientForDetailAction = (ingredient: IIngredient): IAddIngredientForDetailAction => ({
    type: ADD_INGREDIENT_FOR_DETAIL,
    ingredient
});
  
export const removeIngredientForDetailAction = (): IRemoveIngredientForDetailAction => ({
    type: REMOVE_INGREDIENT_FOR_DETAIL,
});

export const ingredientDetailReducer = (
    state = ingredientDetailInitialState,
    action: TIngredientDetailActions
):IIngredientDetailState => {
    switch (action.type) {
        case ADD_INGREDIENT_FOR_DETAIL: {
            return {
                ...state,
                selectIngredientForDetail: action.ingredient,
            };
        }
        case 'REMOVE_INGREDIENT_FOR_DETAIL':
        case REMOVE_INGREDIENT_FOR_DETAIL: {
            return {
                ...state,
                selectIngredientForDetail: null,
            };
        }
        default: {
            return state;
        }
    }
};

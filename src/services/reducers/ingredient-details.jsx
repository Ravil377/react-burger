import { ADD_INGREDIENT_FOR_DETAIL, REMOVE_INGREDIENT_FOR_DETAIL } from '../actions/ingredient-details';

const ingredientDetailInitialState = {
    selectIngredientForDetail: null
};

export const ingredientDetailReducer = (state = ingredientDetailInitialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_FOR_DETAIL: {
            return {
                selectIngredientForDetail: action.ingredient
            };
        }
        case REMOVE_INGREDIENT_FOR_DETAIL: {
            return {
                selectIngredientForDetail: null
            }
        }  
        default: {
          return state;
        }
      }
}
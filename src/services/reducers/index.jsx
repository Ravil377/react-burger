import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { selectIngredientsReducer } from './burger-constructor';
import { ingredientDetailReducer } from './ingredient-details';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    order: orderReducer,
    ingredients: ingredientsReducer,
    selectIngredients: selectIngredientsReducer,
    ingredientDetail: ingredientDetailReducer
});
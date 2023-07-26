import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { selectIngredientsReducer } from './burger-constructor';
import { ingredientDetailReducer } from './ingredient-details';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    selectIngredients: selectIngredientsReducer,
    ingredientDetail: ingredientDetailReducer,
});
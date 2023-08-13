import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { selectIngredientsReducer } from './burger-constructor';
import { ingredientDetailReducer } from './ingredient-details';
import { orderReducer } from './order';
import { userReducer } from './user';
import { wsReducer } from './socket';

export const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    selectIngredients: selectIngredientsReducer,
    ingredientDetail: ingredientDetailReducer,
    ws: wsReducer,
});
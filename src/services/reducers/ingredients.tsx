import { IIngredient } from '../../utils/chema';
import { 
    GET_INGREDIENTS_REQUEST,  
    GET_INGREDIENTS_FAILED, 
    GET_INGREDIENTS_SUCCESS, 
    INGREDIENT_DECREMENT, 
    INGREDIENT_INCREMENT 
} from '../actions/ingredients';

interface IIngredientsState {
    ingredients: IIngredient[];
    isLoading: boolean;
    isError: boolean;
    textError: string;
}

export const ingredientsInitialState: IIngredientsState = {
    ingredients: [],
    isLoading: false,
    isError: false,
    textError: ''
};

export interface IGetIngredientsRequestAction {
    type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    type: typeof GET_INGREDIENTS_SUCCESS;
    ingredients: IIngredient[];
}

export interface IGetIngredientsFailedAction {
    type: typeof GET_INGREDIENTS_FAILED;
    err: string;
}

export interface IIngredientIncrementAction {
    type: typeof INGREDIENT_INCREMENT;
    id: string;
}

export interface IIngredientDecrementAction {
    type: typeof INGREDIENT_DECREMENT;
    id: string;
}

export type TIngredientsActions =
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
    | IIngredientIncrementAction
    | IIngredientDecrementAction;

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsActions):IIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                isLoading: false,
                isError: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                textError: action.err,
            };
        }
        case INGREDIENT_INCREMENT: {
            const ingredientIndex = state.ingredients.findIndex(ingredient => ingredient._id === action.id);
            if (ingredientIndex === -1) {
                return state;
            }
            const ingredient = { ...state.ingredients[ingredientIndex] };
            ingredient.count = ingredient.count ? ingredient.count + 1 : 1;
            const newIngredients = [...state.ingredients];
            newIngredients[ingredientIndex] = ingredient;
            return {
                ...state,
                ingredients: newIngredients,
            };
        }
        case INGREDIENT_DECREMENT: {
            const ingredientIndex = state.ingredients.findIndex(ingredient => ingredient._id === action.id);
            if (ingredientIndex === -1) {
                return state;
            }
            const ingredient = { ...state.ingredients[ingredientIndex] };
            ingredient.count = ingredient.count ? ingredient.count - 1 : 0;
            const newIngredients = [...state.ingredients];
            newIngredients[ingredientIndex] = ingredient;
            return {
                ...state,
                ingredients: newIngredients,
            };
        }
        default: {
            return state;
        }
    }
};

import { 
    GET_INGREDIENTS_REQUEST,  
    GET_INGREDIENTS_FAILED, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS, 
    INGREDIENT_DECREMENT, 
    INGREDIENT_INCREMENT 
} from '../actions/ingredients';

const ingredientsInitialState = {
    ingredients: [],
    isLoading: false,
    isError: false,
    textError: ''
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
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
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                textError: action.err
            }
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
            }
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
            }
        }
        default: {
          return state;
        }
      }
}
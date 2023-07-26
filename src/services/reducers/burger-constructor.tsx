import { 
  ADD_INGREDIENT, 
  REMOVE_INGREDIENT, 
  UPDATE_INGREDIENT_POSITION 
} from '../actions/burger-constructor';
import { checkBun } from '../../utils/utils';
import { IIngredient } from '../../utils/chema';

const selectIngredientsInitialState = {
    selectIngredients: [],
    postOrder: null,
    order: 0
};

export const selectIngredientsReducer = (state = selectIngredientsInitialState, action: any) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
          let updateSelectIngredients: IIngredient[] = [];
            let prevBunPrice: number = 0;
            const isBun = action.ingredient.type === "bun";
            const isBunPrevState = checkBun(state.selectIngredients);
            if( isBun && isBunPrevState !== -1 ) {
                updateSelectIngredients = [...state.selectIngredients];
                prevBunPrice = updateSelectIngredients[isBunPrevState].price;
                updateSelectIngredients[isBunPrevState] = action.ingredient;
            }
            
            return {
              ...state,
              selectIngredients: ((isBun && isBunPrevState === -1) || !isBun) 
                ? [...state.selectIngredients, action.ingredient] 
                : updateSelectIngredients,
              
              order: ((isBun && isBunPrevState === -1) || !isBun) 
                ? state.order += action.ingredient.price * 2
                : state.order = state.order - prevBunPrice * 2 + action.ingredient.price * 2
            };

            
        }
        case REMOVE_INGREDIENT: {
            const newIngredients = state.selectIngredients.filter((ingredient: IIngredient) => ingredient.key !== action.key);
            return {
                ...state,
                selectIngredients: newIngredients,
                isLoading: false,
                isError: false,
            }
        }
        case UPDATE_INGREDIENT_POSITION: {
          const { dragIndex, hoverIndex } = action.payload;
          let newIngredients = [...state.selectIngredients];
          let draggedIngredient = newIngredients[dragIndex];
        
          newIngredients.splice(dragIndex, 1);
          newIngredients.splice(hoverIndex, 0, draggedIngredient);
        
          return {
            ...state,
            selectIngredients: newIngredients,
          };
        }
        default: {
          return state;
        }
      }
}
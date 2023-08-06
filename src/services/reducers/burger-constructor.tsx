import { 
  ADD_INGREDIENT, 
  REMOVE_INGREDIENT, 
  UPDATE_INGREDIENT_POSITION 
} from '../actions/burger-constructor';
import { checkBun } from '../../utils/utils';
import { IIngredient } from '../../utils/chema';

export interface ISelectIngredientsState {
  selectIngredients: IIngredient[];
  postOrder: any | null;
  order: number;
  isLoading: boolean;
  isError: boolean;
}

const selectIngredientsInitialState: ISelectIngredientsState = {
  selectIngredients: [],
  postOrder: null,
  order: 0,
  isLoading: false,
  isError: false
};

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  ingredient: IIngredient;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  key: string;
}

export interface IUpdateIngredientPositionAction {
  readonly type: typeof UPDATE_INGREDIENT_POSITION;
  payload: {
    dragIndex: number;
    hoverIndex: number;
  };
}

export type TIngredientActions = 
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IUpdateIngredientPositionAction;

export const addIngredientAction = (ingredient: IIngredient): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  ingredient
});

export const removeIngredientAction = (key: string): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  key
});

export const updateIngredientPositionAction = (dragIndex: number, hoverIndex: number): IUpdateIngredientPositionAction => ({
  type: UPDATE_INGREDIENT_POSITION,
  payload: { dragIndex, hoverIndex },
});

export const selectIngredientsReducer = (state = selectIngredientsInitialState, action: TIngredientActions): ISelectIngredientsState => {
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
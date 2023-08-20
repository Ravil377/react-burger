import { selectIngredientsInitialState, selectIngredientsReducer as reducer} from "./burger-constructor";
import * as types from '../actions/burger-constructor';
import { ingredientWithCountMock, changeIngredients, selectIngredientsWithIgredientsState } from '../../utils/mock';

describe('burger-constructor reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(selectIngredientsInitialState);
    });

    it("should handle ADD_INGREDIENT", () => {       
        expect(
            reducer(selectIngredientsInitialState, { type: types.ADD_INGREDIENT, ingredient: ingredientWithCountMock })
        ).toEqual({
            ...selectIngredientsInitialState,
            selectIngredients: [ingredientWithCountMock],
            order: 848
        });
    });

    it("should handle REMOVE_INGREDIENT", () => {       
        expect(
            reducer(selectIngredientsInitialState, { type: types.REMOVE_INGREDIENT, ingredient: ingredientWithCountMock })
        ).toEqual({
            ...selectIngredientsInitialState,
            selectIngredients: [],
            isLoading: false,
            isError: false,
        });
    });

    it("should handle UPDATE_INGREDIENT_POSITION", () => {       
        expect(
            reducer(selectIngredientsWithIgredientsState, { type: types.UPDATE_INGREDIENT_POSITION, payload: { dragIndex: 0, hoverIndex: 1 } })
        ).toEqual({
            ...selectIngredientsWithIgredientsState,
            selectIngredients: changeIngredients
        });
    });
});
import { ingredientDetailInitialState, ingredientDetailReducer as reducer} from "./ingredient-details";
import * as types from '../actions/ingredient-details';
import { ingredientMock } from '../../utils/mock';

describe('ingredientDetail reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(ingredientDetailInitialState);
    });
    it('should handle ADD_INGREDIENT_FOR_DETAIL', () => {
        expect(
            reducer(ingredientDetailInitialState, { type: types.ADD_INGREDIENT_FOR_DETAIL, ingredient: [ingredientMock] })
        ).toEqual({
            ...ingredientDetailInitialState,
            selectIngredientForDetail: [ingredientMock]
        });
    });
    it('should handle REMOVE_INGREDIENT_FOR_DETAIL', () => {
        expect(
            reducer(ingredientDetailInitialState, { type: types.REMOVE_INGREDIENT_FOR_DETAIL })
        ).toEqual({
            ...ingredientDetailInitialState,
            selectIngredientForDetail: null
        });
    });
});
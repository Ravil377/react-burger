import { ingredientsInitialState, ingredientsReducer as reducer} from "./ingredients";
import * as types from '../actions/ingredients';
import { ingredientMock } from '../../utils/mock';

const ingredientsInitialFullState = {
    ingredients: [ingredientMock],
    isLoading: false,
    isError: false,
    textError: ''
};

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(ingredientsInitialState);
    });
    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            reducer(ingredientsInitialState, { type: types.GET_INGREDIENTS_REQUEST })
        ).toEqual({
            ...ingredientsInitialState,
            isLoading: true
        });
    });
    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            reducer(ingredientsInitialState, { type: types.GET_INGREDIENTS_SUCCESS, ingredients: [ingredientMock] })
        ).toEqual({
            ...ingredientsInitialState,
            ingredients: [ingredientMock],
            isLoading: false,
            isError: false,
        });
    });
    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(
            reducer(ingredientsInitialState, { type: types.GET_INGREDIENTS_FAILED, err: 'error'})
        ).toEqual({
            ...ingredientsInitialState,
            isLoading: false,
            isError: true,
            textError: 'error',
        })
    })
    it('should handle INGREDIENT_INCREMENT', () => {
        expect(
            reducer(ingredientsInitialFullState, { type: types.INGREDIENT_INCREMENT, id: '643d69a5c3f7b9001cfa0941'})
        ).toEqual({
            ...ingredientsInitialFullState,
            ingredients: [{
                _id: "643d69a5c3f7b9001cfa0941",
                name: "Биокотлета из марсианской Магнолии",
                type: "main",
                proteins: 420,
                fat: 142,
                carbohydrates: 242,
                calories: 4242,
                price: 424,
                image: "https://code.s3.yandex.net/react/code/meat-01.png",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
                __v: 0,
                count: 1
            }]
        })
    })
    it('should handle INGREDIENT_DECREMENT', () => {
        expect(
            reducer(ingredientsInitialFullState, { type: types.INGREDIENT_DECREMENT, id: '643d69a5c3f7b9001cfa0941'})
        ).toEqual({
            ...ingredientsInitialFullState,
            ingredients: [{
                _id: "643d69a5c3f7b9001cfa0941",
                name: "Биокотлета из марсианской Магнолии",
                type: "main",
                proteins: 420,
                fat: 142,
                carbohydrates: 242,
                calories: 4242,
                price: 424,
                image: "https://code.s3.yandex.net/react/code/meat-01.png",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
                __v: 0,
                count: 0
            }]
        })
    })
});
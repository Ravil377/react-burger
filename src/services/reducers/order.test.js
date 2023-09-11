import { orderInitialState, orderReducer as reducer} from "./order";
import * as types from '../actions/order';
import { response_order as res } from '../../utils/mock';

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(orderInitialState);
    });
    it('should handle GET_ORDER_REQUEST', () => {
        expect(
            reducer(orderInitialState, { type: types.GET_ORDER_REQUEST })
        ).toEqual({
            ...orderInitialState,
            isLoading: true,
            isError: false,
        });
    });
    it('should handle GET_ORDER_SUCCESS', () => {
        expect(
            reducer(orderInitialState, { type: types.GET_ORDER_SUCCESS, order: res })
        ).toEqual({
            ...orderInitialState,
            order: res,
            isLoading: false,
            isError: false,
        });
    });
    it('should handle GET_ORDER_FAILED', () => {
        expect(
            reducer(orderInitialState, { type: types.GET_ORDER_FAILED, err: 'error' })
        ).toEqual({
            ...orderInitialState,
            isLoading: false,
            isError: true,
            textError: 'error',
        });
    });
    it('should handle REMOVE_ORDER', () => {
        expect(
            reducer(orderInitialState, { type: types.REMOVE_ORDER})
        ).toEqual({
            ...orderInitialState,
            order: null
        });
    });
});
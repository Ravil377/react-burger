import { initialState, wsReducer as reducer} from "./socket";
import * as types from '../actions/socket';
import { feedMock } from '../../utils/mock';

describe('socket reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            reducer(initialState, { type: types.WS_CONNECTION_SUCCESS })
        ).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: true
        });
    });
    it('should handle WS_CONNECTION_ERROR', () => {
        expect(
            reducer(initialState, { type: types.WS_CONNECTION_ERROR, payload: 'error' })
        ).toEqual({
            ...initialState,
            error: 'error',
            wsConnected: false
        });
    });
    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            reducer(initialState, { type: types.WS_CONNECTION_CLOSED })
        ).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: false
        });
    });
    it('should handle WS_GET_MESSAGE', () => {
        expect(
            reducer(initialState, { type: types.WS_GET_MESSAGE, payload: feedMock })
        ).toEqual({
            ...initialState,
            error: undefined,
            orders: feedMock.orders,
            totalOrders: feedMock.total,
            totalOrdersToday: feedMock.totalToday
        });
    });
});
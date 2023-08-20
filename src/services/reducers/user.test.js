import { userInitialState, userReducer as reducer} from "./user";
import * as types from '../actions/user';
import { userMock } from '../../utils/mock';

describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(userInitialState);
    });
    it('should handle POST_LOADING_REGISTER', () => {
        expect(
            reducer(userInitialState, { type: types.POST_LOADING_REGISTER })
        ).toEqual({
            ...userInitialState,
            isLoading: true,
            isError: false,
            isSuccess: false,
        });
    });
    it('should handle POST_REGISTER_SUCCESS', () => {
        expect(
            reducer(userInitialState, { type: types.POST_REGISTER_SUCCESS, user: userMock })
        ).toEqual({
            ...userInitialState,
            isLoading: false,
            isError: false,
            user: userMock || null,
            isSuccess: true,
            isAuthCheck: true,
        });
    });
    it('should handle POST_REGISTER_FAILED', () => {
        expect(
            reducer(userInitialState, { type: types.POST_REGISTER_FAILED, err: 'error' })
        ).toEqual({
            ...userInitialState,
            isError: true,
            isLoading: false,
            textError: 'error',
            isSuccess: false,
            user: null,
        });
    });
    it('should handle SET_AUTH_CHECKED', () => {
        expect(
            reducer(userInitialState, { type: types.SET_AUTH_CHECKED, isAuthCheck: true })
        ).toEqual({
            ...userInitialState,
            isAuthCheck: true,
        });
    });
    it('should handle SET_USER', () => {
        expect(
            reducer(userInitialState, { type: types.SET_USER, user: userMock })
        ).toEqual({
            ...userInitialState,
            user: userMock
        });
    });
});
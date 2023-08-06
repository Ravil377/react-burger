import { IUser } from '../../utils/chema';
import {
  SET_AUTH_CHECKED,
  SET_USER,
  POST_LOADING_REGISTER,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILED
} from '../actions/user';

interface IUserState {
  isAuthCheck: boolean;
  isSuccess: boolean;
  user: IUser | null;
  isLoading: boolean;
  isError: boolean;
  textError: string;
}

const userInitialState: IUserState = {
  isAuthCheck: false,
  isSuccess: false,
  user: null,
  isLoading: false,
  isError: false,
  textError: ''
};

export interface IPostLoadingRegisterAction {
  type: typeof POST_LOADING_REGISTER;
}

export interface IPostRegisterSuccessAction {
  type: typeof POST_REGISTER_SUCCESS;
  user: IUser;
}

export interface IPostRegisterFailedAction {
  type: typeof POST_REGISTER_FAILED;
  err: string;
}

export interface ISetAuthCheckedAction {
  type: typeof SET_AUTH_CHECKED;
  isAuthCheck: boolean;
}

export interface ISetUserAction {
  type: typeof SET_USER;
  user: IUser;
}

export type TUserActions =
  | IPostLoadingRegisterAction
  | IPostRegisterSuccessAction
  | IPostRegisterFailedAction
  | ISetAuthCheckedAction
  | ISetUserAction;

export const userReducer = (state = userInitialState, action: TUserActions):IUserState => {
  switch (action.type) {
      case POST_LOADING_REGISTER: {
          return {
              ...state,
              isLoading: true,
              isError: false,
              isSuccess: false,
          };
      }
      case POST_REGISTER_SUCCESS: {
          return {
              ...state,
              isLoading: false,
              isError: false,
              user: action.user,
              isSuccess: true,
              isAuthCheck: true,
          };
      }
      case POST_REGISTER_FAILED: {
          return {
              ...state,
              isError: true,
              isLoading: false,
              textError: action.err,
              isSuccess: false,
              user: null,
          };
      }
      case SET_AUTH_CHECKED: {
          return {
              ...state,
              isAuthCheck: action.isAuthCheck,
          };
      }
      case SET_USER: {
          return {
              ...state,
              user: action.user,
          };
      }
      default: {
          return state;
      }
  }
};

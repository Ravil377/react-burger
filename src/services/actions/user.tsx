import { NavigateFunction } from 'react-router-dom';
import api from '../../utils/api';
import { 
  AppDispatch,
  IForgotPasswordUserProps, 
  IPostLoginUser, 
  IResetPasswordUserProps, 
  IUserProps } from '../../utils/chema';

export const SET_USER: "SET_USER" = "SET_USER";
export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";
export const POST_LOADING_REGISTER: "POST_LOADING_REGISTER" = "POST_LOADING_REGISTER";
export const POST_REGISTER_SUCCESS: "POST_REGISTER_SUCCESS" = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_FAILED: "POST_REGISTER_FAILED" = "POST_REGISTER_FAILED";

export function getUser(): (dispatch: AppDispatch) => void {
  return (dispatch) => {
    return api.getUser(localStorage.getItem("accessToken"))
      .then((res) => {
        dispatch({ type: SET_AUTH_CHECKED, isAuthCheck: true });
        dispatch({
          type: SET_USER,
          user: res.user
        });
      })
      .catch((res) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({
          type: POST_REGISTER_FAILED,
          err: res.err
        });
      })
  };
};

export function checkUserAuth(): (dispatch: AppDispatch) => void {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      api.refreshToken()
        .then((res) => {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(getUser());
        })
        .catch((res) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: POST_REGISTER_FAILED,
            err: res.err
          });
        })
        .finally(() => dispatch({ type: SET_AUTH_CHECKED, isAuthCheck: true }));
    } else {
      dispatch({ type: SET_AUTH_CHECKED, isAuthCheck: true });
    }
  };
};

export function patchUser({ email, password, name }: IUserProps): (dispatch: AppDispatch) => void {
  return function (dispatch) {
    dispatch({ type: POST_LOADING_REGISTER });
    api.patchUser(localStorage.getItem("accessToken"), email, name, password)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: POST_REGISTER_SUCCESS,
            user: res.user
          });
        }
      })
      .catch(err =>
        dispatch({
          type: POST_REGISTER_FAILED,
          err: err
        })
      );
  };
};

export function postRegisterUser({ email, password, name }:IUserProps): (dispatch: AppDispatch) => void {
  return function (dispatch) {
    dispatch({ type: POST_LOADING_REGISTER });
    api.register(email, password, name)
      .then(res => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: POST_REGISTER_SUCCESS,
            user: res.user
          });
        }
      })
      .catch(err =>
        dispatch({
          type: POST_REGISTER_FAILED,
          err: err
        })
      );
  };
};


export function resetPasswordUser({ password, token }: IResetPasswordUserProps, navigate: NavigateFunction): (dispatch: AppDispatch) => void {
  return function (dispatch) {
    dispatch({ type: POST_LOADING_REGISTER });
    api.resetPassword(password, token)
      .then(res => {
        if (res && res.success) {
          navigate('/login');
        }
      })
      .catch(err =>
        dispatch({
          type: POST_REGISTER_FAILED,
          err: err
        })
      );
  };
};


export function forgotPasswordUser({ email }:IForgotPasswordUserProps, navigate: NavigateFunction): (dispatch: AppDispatch) => void {
  return function (dispatch) {
    dispatch({ type: POST_LOADING_REGISTER });
    api.forgotPassword(email)
      .then(res => {
        if (res && res.success) {
          navigate('/reset-password');
        }
      })
      .catch(err =>
        dispatch({
          type: POST_REGISTER_FAILED,
          err: err
        })
      );
  };
};

export function postLoginUser({ email, password }:IPostLoginUser): (dispatch: AppDispatch) => void {
  return function (dispatch) {
    dispatch({ type: POST_LOADING_REGISTER });
    api.login(email, password)
      .then(res => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: POST_REGISTER_SUCCESS,
            user: res.user
          });
        }
      })
      .catch(err =>
        dispatch({
          type: POST_REGISTER_FAILED,
          err: err
        })
      );
  };
}

export function logOutUser(): (dispatch: AppDispatch) => void {
    return function (dispatch) {
      dispatch({ type: POST_LOADING_REGISTER });
      api.logOut(localStorage.getItem("refreshToken"))
        .then(res => {
          if (res && res.success) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch({
              type: POST_REGISTER_SUCCESS
            });
          }
        })
        .catch(err =>
          dispatch({
            type: POST_REGISTER_FAILED,
            err: err
          })
        );
    };
}
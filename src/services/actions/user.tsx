import api from '../../utils/api';
import { 
  IForgotPasswordUserProps, 
  IPostLoginUser, 
  IResetPasswordUserProps, 
  IUserProps } from '../../utils/chema';

export const SET_USER = "SET_USER";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const POST_LOADING_REGISTER = "POST_LOADING_REGISTER";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_FAILED = "POST_REGISTER_FAILED";

export const getUser = () => {
  // @ts-ignore
  return (dispatch) => {
    return api.getUser(localStorage.getItem("accessToken"))
      .then((res) => {
        dispatch({ type: SET_AUTH_CHECKED, isAuthCheck: true });
        dispatch({
          type: SET_USER,
          user: res.user
        });
      });
  };
};

export const checkUserAuth = () => {
  // @ts-ignore
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

export const patchUser = ({ email, password, name }: IUserProps) => {
  // @ts-ignore
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

export const postRegisterUser = ({ email, password, name }:IUserProps) => {
  // @ts-ignore
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


export const resetPasswordUser = ({ password, token }: IResetPasswordUserProps, history: any) => {
  // @ts-ignore
  return function (dispatch) {
    dispatch({ type: POST_LOADING_REGISTER });
    api.resetPassword(password, token)
      .then(res => {
        if (res && res.success) {
            history.push('/login');
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


export const forgotPasswordUser = ({ email }:IForgotPasswordUserProps, history: any) => {
  // @ts-ignore
  return function (dispatch) {
    dispatch({ type: POST_LOADING_REGISTER });
    api.forgotPassword(email)
      .then(res => {
        if (res && res.success) {
          history.push('/reset-password');
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

export function postLoginUser({ email, password }:IPostLoginUser) {
  // @ts-ignore
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

export function logOutUser() {
  // @ts-ignore
    return function (dispatch) {
      dispatch({ type: POST_LOADING_REGISTER });
      api.logOut(localStorage.getItem("refreshToken"))
        .then(res => {
          if (res && res.success) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch({
              type: POST_REGISTER_SUCCESS,
              user: null
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
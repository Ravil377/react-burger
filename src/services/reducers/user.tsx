import { 
    SET_AUTH_CHECKED,
    SET_USER,
    POST_LOADING_REGISTER,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_FAILED,
} from '../actions/user';

const userInitialState = {
    isAuthCheck: false,
    isSuccess: false,
    user: null,
    isLoading: false,
    isError: false,
    textError: ''
};

export const userReducer = (state = userInitialState, action: any) => {
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
              isAuthCheck: true
            };
        }
        case POST_REGISTER_FAILED: {
            return {
                ...state,
                isError: true,
                isLoading: false,
                textError: action.err,
                isSuccess: false,
                user: null
            }
        }
        case SET_AUTH_CHECKED: {
            return {
              ...state,
              isAuthCheck: action.isAuthCheck
            };
        }
        case SET_USER: {
            return {
              ...state,
              user: action.user
            };
        }
        default: {
          return state;
        }
      }
}
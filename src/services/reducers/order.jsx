import { 
    GET_ORDER_REQUEST,  
    GET_ORDER_FAILED, 
    GET_ORDER_SUCCESS,
    REMOVE_ORDER
} from '../actions/order';

const orderInitialState = {
    isLoading: false,
    isError: false,
    textError: '',
    order: null
};

export const orderReducer = (state = orderInitialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
              ...state,
              isLoading: true,
              isError: false,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
                isLoading: false,
                isError: false,
            }
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                textError: action.err
            }
        }
        case REMOVE_ORDER: {
            return {
                ...state,
                order: null
            }
        }
        default: {
          return state;
        }
      }
}
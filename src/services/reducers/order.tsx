import { IOrder } from '../../utils/chema';
import { 
    GET_ORDER_REQUEST,  
    GET_ORDER_FAILED, 
    GET_ORDER_SUCCESS,
    REMOVE_ORDER
} from '../actions/order';

interface IOrderState {
    isLoading: boolean;
    isError: boolean;
    textError: string;
    order: IOrder | null;
}

const orderInitialState: IOrderState = {
    isLoading: false,
    isError: false,
    textError: '',
    order: null
};

export interface IGetOrderRequestAction {
    type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
    type: typeof GET_ORDER_SUCCESS;
    order: IOrder;
}

export interface IGetOrderFailedAction {
    type: typeof GET_ORDER_FAILED;
    err: string;
}

export interface IRemoveOrderAction {
    type: typeof REMOVE_ORDER;
}

export type TOrderActions =
    | IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderFailedAction
    | IRemoveOrderAction;

export const orderReducer = (state = orderInitialState, action: TOrderActions):IOrderState => {
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
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                textError: action.err,
            };
        }
        case REMOVE_ORDER: {
            return {
                ...state,
                order: null,
            };
        }
        default: {
            return state;
        }
    }
};

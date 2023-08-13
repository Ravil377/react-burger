import { TOrder, TWSMessage } from "../../utils/chema";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../actions/socket";

export interface IWSConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
}

export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: Event;
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TWSMessage;
}

export type TWSActions =
    | IWSConnectionStartAction
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetMessageAction;

type TWSState = {
    wsConnected: boolean;
    orders: TOrder[] | [];
    userOrders: [];
    totalOrders: number | null;
    totalOrdersToday: number | null;
    error?: Event;
};

export const initialState: TWSState = {
    wsConnected: false,
    orders: [],
    userOrders: [],
    totalOrders: null,
    totalOrdersToday: null
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                orders: action.payload.orders,
                totalOrders: action.payload.total,
                totalOrdersToday: action.payload.totalToday
            };

        default:
            return state;
    }
};
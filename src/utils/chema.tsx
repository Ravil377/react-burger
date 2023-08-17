import { ThunkDispatch } from "redux-thunk";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_STOP, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../services/actions/socket";
import store from "../store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TIngredientActions } from "../services/reducers/burger-constructor";
import { TIngredientDetailActions } from "../services/reducers/ingredient-details";
import { TIngredientsActions } from "../services/reducers/ingredients";
import { TOrderActions } from "../services/reducers/order";
import { TUserActions } from "../services/reducers/user";
import { TWSActions } from "../services/reducers/socket";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TActions>;

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type TActions = TIngredientActions | TIngredientDetailActions | TIngredientsActions | TOrderActions | TUserActions | TWSActions;

export interface IIngredient {
    key: string;
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    calories: number;
    carbohydrates: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    count?: number;
}

export interface IOrder {
    success: boolean;
    name: string;
    order: {
        number: number;
    };
}

export interface IUser {
    email: string;
    name: string;
}

export interface IUserProps {
    email: string;
    password: string;
    name: string;
}

export interface IResetPasswordUserProps {
    password: string;
    token: string;
}

export interface IForgotPasswordUserProps {
    email: string;
}

export interface IPostLoginUser {
    email: string;
    password: string;
}

export type TOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
};

export type TWSMessage = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
};

export const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsStop: WS_CONNECTION_STOP,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

export type TWS = {
    wsInit: typeof WS_CONNECTION_START;
    wsStop: typeof WS_CONNECTION_STOP;
    onOpen: typeof WS_CONNECTION_SUCCESS;
    onClose: typeof WS_CONNECTION_CLOSED;
    onError: typeof WS_CONNECTION_ERROR;
    onMessage: typeof WS_GET_MESSAGE;
};


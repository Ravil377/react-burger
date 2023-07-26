import { ReactNode } from "react";

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

export interface IModalOverlayProps {
    modalClose: () => void;
}

export interface IModalProps {
    children?: ReactNode;
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
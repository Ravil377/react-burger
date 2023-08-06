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
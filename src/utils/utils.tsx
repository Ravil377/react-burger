import { IIngredient, TOrder } from "./chema";

export const filterByType = (type: string, ingredients: IIngredient[]): IIngredient[] =>
  ingredients.filter((item) => item.type === type);

export const filterById = (id: string, ingredients: IIngredient[]): IIngredient | undefined =>
  ingredients.find((item) => item._id === id);

export const checkBun = (selectIngredients: IIngredient[]): number =>
  selectIngredients.findIndex(item => item.type === 'bun');

export const sum = (order:TOrder, ingredients: IIngredient[]): number => {
    let sum = 0;
    order.ingredients.map((ingredient) => {
        const i = filterById(ingredient, ingredients);
        if(i) sum = sum + i.price;
    })
    return sum;
}
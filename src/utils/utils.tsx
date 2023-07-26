import { IIngredient } from "./chema";

export const filterByType = (type: string, ingredients: IIngredient[]): IIngredient[] =>
  ingredients.filter((item) => item.type === type);

export const filterById = (id: string, ingredients: IIngredient[]): IIngredient | undefined =>
  ingredients.find((item) => item._id === id);

export const checkBun = (selectIngredients: IIngredient[]): number =>
  selectIngredients.findIndex(item => item.type === 'bun');
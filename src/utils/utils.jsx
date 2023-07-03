export const filterByType = (type, ingredients) => ingredients.filter(item => item.type === type);

export const filterById = (id, ingredients) => {
    return ingredients.find(item => item._id === id);
}

export const checkBun = (selectIngredients) => selectIngredients.findIndex(item => item.type === 'bun');
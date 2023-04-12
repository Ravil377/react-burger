import React, { useCallback, useContext } from 'react';
import ingredientCardStyles from './ingredientCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredient } from '../../../utils/propTypes';
import PropTypes from 'prop-types';
import { IngredientContext } from '../../../utils/ingredientContext';
import { filterById } from '../../../utils/utils';
import { checkBun } from '../../../utils/utils';

export const IngredientCard = ({ ingredient, count, modalOpen }) => {

    const { ingredients, setIngredients } = useContext(IngredientContext); 

    const handleIngredientClick = useCallback((e) => {
        const id = e.currentTarget.id;
        modalOpen();
        setIngredients(prevState => {
            let updateSelectIngredients;
            const newIngredient = filterById(id, ingredients.data);
            const isBun = filterById(id, ingredients.data).type === "bun";
            const isBunPrevState = checkBun(prevState.selectIngredients);
            if( isBun && isBunPrevState !== -1 ) {
                updateSelectIngredients = [...prevState.selectIngredients];
                updateSelectIngredients[isBunPrevState] = newIngredient;
            }
            return {
                ...prevState,
                selectIngredients: ((isBun && isBunPrevState === -1) || !isBun) 
                    ? [...prevState.selectIngredients, newIngredient] 
                    : updateSelectIngredients,
                ingredientForModal: newIngredient
            }
        })
    }, [modalOpen, setIngredients, ingredients.data]);

    return (
        <li className={`pl-4 pr-4 ${ingredientCardStyles.ingredient}`} onClick={handleIngredientClick} id={ingredient._id} >
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            <img src={ingredient.image} alt={ingredient.name} />
            <p className={`text text_type_digits-default ${ingredientCardStyles.price}`}>{ingredient.price}<CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-small ${ingredientCardStyles.name}`}>{ingredient.name}</p>
        </li>
    )
}

IngredientCard.propTypes = {
    ingredient: PropTypes.shape(ingredient).isRequired,
    count: PropTypes.number.isRequired,
    modalOpen: PropTypes.func.isRequired,
};



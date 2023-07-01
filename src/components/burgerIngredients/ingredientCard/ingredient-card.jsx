import { useCallback, useContext } from 'react';
import ingredientCardStyles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredient } from '../../../utils/prop-types';
import PropTypes from 'prop-types';
import { filterById } from '../../../utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_INGREDIENT_FOR_DETAIL } from '../../../services/actions/ingredient-details';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';

export const IngredientCard = ({ ingredient }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    let state = location.state;
    const { ingredients } = useSelector(state => state.ingredients);
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient
    });

    const handleIngredientClick = useCallback((e) => {
        const id = e.currentTarget.id;
        const newIngredient = filterById(id, ingredients);
        dispatch({ type: ADD_INGREDIENT_FOR_DETAIL, ingredient: {...newIngredient} });
    }, [dispatch]);

    return (
        <Link 
            to={`/ingredients/:${ingredient._id}`}
            className={`pl-4 pr-4 ${ingredientCardStyles.ingredient}`} 
            ref={dragRef} 
            onClick={handleIngredientClick} 
            id={ingredient._id} 
            state={{backgroundLocation: location}}
            >
            {(ingredient.count !=0 && ingredient.count) && <Counter count={ingredient.count} size="default" extraClass="m-1" />}
            <img src={ingredient.image} alt={ingredient.name} />
            <p className={`text text_type_digits-default ${ingredientCardStyles.price}`}>{ingredient.price}<CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-small ${ingredientCardStyles.name}`}>{ingredient.name}</p>
        </Link>
    )
}

IngredientCard.propTypes = {
    ingredient: PropTypes.shape(ingredient).isRequired
};



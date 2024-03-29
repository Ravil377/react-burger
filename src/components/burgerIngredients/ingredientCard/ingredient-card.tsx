import { FC, useCallback } from 'react';
import ingredientCardStyles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { filterById } from '../../../utils/utils';
import { useDispatch } from 'react-redux';
import { ADD_INGREDIENT_FOR_DETAIL } from '../../../services/actions/ingredient-details';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import { IIngredient, useAppSelector } from '../../../utils/chema';

interface IngredientCardProps {
    ingredient: IIngredient;
}

export const IngredientCard:FC<IngredientCardProps> = ({ ingredient }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    
    const { ingredients } = useAppSelector(store => store.ingredients);
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient
    });

    const handleIngredientClick = useCallback((e: any) => {
        const id = e.currentTarget.id;
        const newIngredient = filterById(id, ingredients);
        dispatch({ type: ADD_INGREDIENT_FOR_DETAIL, ingredient: {...newIngredient} });
    }, [dispatch]);

    return (
        <Link 
            to={`/ingredients/:${ingredient._id}`}
            data-testid="ingredient"
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



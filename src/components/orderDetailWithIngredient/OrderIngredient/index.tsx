import { Link, useLocation, useParams } from 'react-router-dom'
import OrderIngredientStyle from './OrderIngredient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient, TOrder, useAppDispatch, useAppSelector } from '../../../utils/chema';
import { FC, useCallback, useEffect, useState } from 'react';
import { filterById } from '../../../utils/utils';
import { ADD_INGREDIENT_FOR_DETAIL } from '../../../services/actions/ingredient-details';
import { useDispatch } from 'react-redux';

interface IFeedOrderProps {
    id: string;
}

export const OrderIngredient:FC<IFeedOrderProps>= ({id}) => {
    const { ingredients } = useAppSelector(state => state.ingredients);
    const [ingredient, setIngredient] = useState<IIngredient>()
    const dispatch = useDispatch();
    const location = useLocation();
    
    useEffect(()=> {
        if(id) {
            setIngredient(filterById(id, ingredients));
        }
    }, [id])

    const handleIngredientClick = useCallback((e: any) => {
        const id = e.currentTarget.id;
        const newIngredient = filterById(id, ingredients);
        dispatch({ type: ADD_INGREDIENT_FOR_DETAIL, ingredient: {...newIngredient} });
    }, [dispatch]);

    return (
        <Link 
            to={`/ingredients/:${ingredient?._id}`} 
            className={OrderIngredientStyle.ingredient} 
            onClick={handleIngredientClick} 
            state={{backgroundLocation: location}}
        >
            <div className={OrderIngredientStyle.img} ><img src={ingredient?.image_mobile} alt="Image" /></div>
            <p className='text text_type_main-default ml-4' style={{color: "white", textDecoration: "none"}}>{ingredient?.name}</p>
            <p className='text text_type_main-default ml-4 mr-2' style={{color: "white", textDecoration: "none", marginLeft: "auto"}}>{ingredient?.price}</p>
            <CurrencyIcon type="primary" />
        </Link>
    )
}
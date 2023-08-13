import { Link, useParams } from 'react-router-dom'
import OrderIngredientStyle from './OrderIngredient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient, TOrder, useAppSelector } from '../../../utils/chema';
import { FC, useEffect, useState } from 'react';
import { filterById } from '../../../utils/utils';

interface IFeedOrderProps {
    id: string;
}

export const OrderIngredient:FC<IFeedOrderProps>= ({id}) => {
    const { ingredients } = useAppSelector(state => state.ingredients);
    const [ingredient, setIngredient] = useState<IIngredient>()
    useEffect(()=> {
        if(id) {
            setIngredient(filterById(id, ingredients));
        }
    }, [id])

    return (
        <Link to={`/ingredients/:${ingredient?._id}`} className={OrderIngredientStyle.ingredient} >
            <div className={OrderIngredientStyle.img} ><img src={ingredient?.image_mobile} alt="Image" /></div>
            <p className='text text_type_main-default ml-4' style={{color: "white", textDecoration: "none"}}>{ingredient?.name}</p>
            <p className='text text_type_main-default ml-4 mr-2' style={{color: "white", textDecoration: "none", marginLeft: "auto"}}>{ingredient?.price}</p>
            <CurrencyIcon type="primary" />
        </Link>
    )
}
import React, { useContext } from 'react';
import orderDetailsStyles from './order-details.module.css';
import { titleOrder, start, wait } from '../../utils/constants';
import success from "../../images/success.svg";
import { IngredientContext } from '../../utils/ingredient-context';

export const OrderDetails = () => {

    const { ingredients, setIngredients } = useContext(IngredientContext); 
    
    return (
        <div className={`${orderDetailsStyles.container} pt-30 pb-30 pl-10 pr-10`}>
            <p className={`${orderDetailsStyles.order} text text_type_digits-large mb-8`}>{ingredients.postOrder.order.number}</p>
            <p className={`${orderDetailsStyles.title} text text_type_main-medium mb-15`}>{ingredients.postOrder.name}</p>
            <img className={`${orderDetailsStyles.success}`} src={success} />
            <p className={`text text_type_main-default mt-15 ${orderDetailsStyles.start}`}>{start}</p>
            <p className={`text text_type_main-default text_color_inactive mt-2 ${orderDetailsStyles.wait}`}>{wait}</p>
        </div>
    )
}

import orderDetailsWithIngredientStyles from './orderDetailWithIngredient.module.css';
import { start, wait } from '../../utils/constants';
import success from "../../images/success.svg";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { OrderIngredient } from './OrderIngredient'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrder, useAppSelector } from '../../utils/chema';
import { filterById, sum } from '../../utils/utils';
import { useEffect, useState } from 'react';



export const OrderDetailsWithIngredient = () => {
    const { orders } = useAppSelector(store => store.ws);
    const { ingredients } = useAppSelector(state => state.ingredients);

    const { id } = useParams();
    const [order, setOrder] = useState<TOrder>()

    useEffect(() => {
        if(id) {
            const extractedId = parseInt(id.substring(1), 10);
            setOrder(orders.find((item) => item.number === extractedId));
        }
    }, [id, orders])
    


    return (
        <div className={orderDetailsWithIngredientStyles.container}>
            <p className="text text_type_main-small" style={{textAlign: "center"}}>#{order?.number}</p>
            <p className="text text_type_main-medium mt-10" >{order?.name}</p>
            <p className="text text_type_main-default mt-3" style={{color: "#00CCCC"}}>Выполнен</p>
            <p className="text text_type_main-medium mt-15" >Состав:</p>
            <div className={`${orderDetailsWithIngredientStyles.list} mt-6 custom-scroll pr-6 mb-10`}>
                {order && order.ingredients.map((ingredient: string, idx) => <OrderIngredient id={ingredient} key={idx}/> )}
            </div>
            <div className={orderDetailsWithIngredientStyles.orders}>
                <p className='text text_type_main-default text_color_inactive'></p>
                <p className='text text_type_main-default' style={{color: "white", display: "flex", alignItems: "center", columnGap: "8px"}}>
                    {order && sum(order, ingredients)}
                    <CurrencyIcon type="primary" />
                </p>
            </div>
        </div>
    )
}

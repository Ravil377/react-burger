import orderDetailsWithIngredientStyles from './orderDetailWithIngredient.module.css';
import { start, wait } from '../../utils/constants';
import success from "../../images/success.svg";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { OrderIngredient } from './OrderIngredient'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';



export const OrderDetailsWithIngredient = () => {
    const { id } = useParams();
    
    return (
        <div className={orderDetailsWithIngredientStyles.container}>
            <p className="text text_type_main-small" style={{textAlign: "center"}}>#034533</p>
            <p className="text text_type_main-medium mt-10" >Black Hole Singularity острый бургер</p>
            <p className="text text_type_main-default mt-3" style={{color: "#00CCCC"}}>Выполнен</p>
            <p className="text text_type_main-medium mt-15" >Состав:</p>
            <div className={`${orderDetailsWithIngredientStyles.list} mt-6 custom-scroll pr-6 mb-10`}>
                <OrderIngredient />
                <OrderIngredient />
                <OrderIngredient />
                <OrderIngredient />
                <OrderIngredient />
                <OrderIngredient />
            </div>
            <div className={orderDetailsWithIngredientStyles.orders}>
                <p className='text text_type_main-default text_color_inactive'>Вчера, 13:50</p>
                <p className='text text_type_main-default' style={{color: "white", display: "flex", alignItems: "center", columnGap: "8px"}}>510
                    <CurrencyIcon type="primary" />
                </p>
            </div>
        </div>
    )
}

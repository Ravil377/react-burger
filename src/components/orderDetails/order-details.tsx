import orderDetailsStyles from './order-details.module.css';
import { start, wait } from '../../utils/constants';
import success from "../../images/success.svg";
import { useSelector } from 'react-redux';

export const OrderDetails = () => {
    // @ts-ignore
    const { data } = useSelector(state => ({ data: state.order.order }));  
    const { name, order } = data;
    
    return (
        <div className={orderDetailsStyles.container}>
            <p className={`${orderDetailsStyles.order} text text_type_digits-large mb-8`}>{order.number}</p>
            <p className={`${orderDetailsStyles.title} text text_type_main-medium mb-15`}>{name}</p>
            <img className={`${orderDetailsStyles.success}`} src={success} />
            <p className={`text text_type_main-default mt-15 ${orderDetailsStyles.start}`}>{start}</p>
            <p className={`text text_type_main-default text_color_inactive mt-2 ${orderDetailsStyles.wait}`}>{wait}</p>
        </div>
    )
}

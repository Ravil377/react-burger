import orderDetailsStyles from './orderDetails.module.css';
import { titleOrder, start, wait } from '../../utils/constants';
import success from "../../images/success.svg";

export const OrderDetails = () => {

    return (
        <div className={`${orderDetailsStyles.container} pt-30 pb-30 pl-10 pr-10`}>
            <p className={`${orderDetailsStyles.order} text text_type_digits-large mb-8`}>034536</p>
            <p className={`${orderDetailsStyles.title} text text_type_main-medium mb-15`}>{titleOrder}</p>
            <img className={`${orderDetailsStyles.success}`} src={success} />
            <p className={`text text_type_main-default mt-15 ${orderDetailsStyles.start}`}>{start}</p>
            <p className={`text text_type_main-default text_color_inactive mt-2 ${orderDetailsStyles.wait}`}>{wait}</p>
        </div>
    )
}

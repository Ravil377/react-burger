import { Link } from "react-router-dom";
import statsStyle from "./stats.module.css";
import { TOrder, useAppSelector } from "../../../utils/chema";

export const Stats = () => {
    const { orders, totalOrders, totalOrdersToday } = useAppSelector(store => store.ws);

    const ready: TOrder[] = orders
      .filter((order: TOrder) => order.status === 'done')
      .slice(0, 30);

    const progress: TOrder[] = orders
      .filter((order: TOrder) => order.status === 'pending')
      .slice(0, 30);

    return (
        <div className={`${statsStyle.stats} custom-scroll`}>
            <div className={statsStyle.numbers} >
                <div>
                    <p className="text text_type_main-medium mb-6">Готовы:</p>
                    <ul className={statsStyle.list} >
                        {ready.map(order => <li key={order._id} className="text text_type_digits-default"><Link to={`/feed/:${order.number}`} >{order.number}</Link></li>)}
                    </ul>
                </div>
                <div>
                    <p className="text text_type_main-medium mb-6">В работе:</p>
                    <ul>
                        {progress.map(order => <li key={order._id} className="text text_type_digits-default"><Link to={`/feed/:${order.number}`} >{order.number}</Link></li>)}
                    </ul>
                </div>

            </div>
            <div>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className="text text_type_digits-large" style={{textShadow: "0px 4px 32px rgba(51, 51, 255, 0.50), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 0px 16px rgba(51, 51, 255, 0.25)"}}>{totalOrders}</p>
            </div>
            <div>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large" style={{textShadow: "0px 4px 32px rgba(51, 51, 255, 0.50), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 0px 16px rgba(51, 51, 255, 0.25)"}}>{totalOrdersToday}</p>
            </div>
        </div>
    )
}
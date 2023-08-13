import feedListStyle from "./feed.module.css";
import { FeedOrder } from "./order";
import { TOrder, useAppSelector } from "../../utils/chema";

export const FeedList = () => {
    const { orders } = useAppSelector(store => store.ws);

    return (
        <div className={`${feedListStyle.list} custom-scroll`}>
            {orders.map((order:TOrder) => <FeedOrder order={order} key={order._id}/> )}
        </div>
    )
}
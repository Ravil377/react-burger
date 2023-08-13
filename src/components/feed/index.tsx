import feedListStyle from "./feed.module.css";
import { FeedOrder } from "./order";
import { TOrder, useAppSelector } from "../../utils/chema";

export const FeedList = () => {
    const { orders } = useAppSelector(store => store.ws);

    return (
        <div className={`${feedListStyle.list} custom-scroll`}>
            {orders && orders.map((order:TOrder, idx: number) => <FeedOrder order={order} key={idx}/> )}
        </div>
    )
}
import { useEffect } from "react";
import feedListStyle from "./feed.module.css";
import { FeedOrder } from "./order";
import { TOrder, useAppDispatch, useAppSelector } from "../../utils/chema";
import { ws } from "../../utils/constants";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/socket";

export const FeedList = () => {
    const { orders } = useAppSelector(store => store.ws);
    const dispatch = useAppDispatch();
    const wsUrl = ws + '/orders/all';

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: wsUrl
        });

        return () => {
            dispatch({
                type: WS_CONNECTION_CLOSED
            });
        };
    }, [dispatch, wsUrl]);

    return (
        <div className={`${feedListStyle.list} custom-scroll`}>
            {orders.map((order:TOrder) => <FeedOrder order={order}/> )}
        </div>
    )
}
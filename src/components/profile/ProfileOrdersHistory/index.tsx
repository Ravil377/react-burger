import { useEffect } from "react";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../../services/actions/socket";
import { FeedList } from "../../feed";
import { ws } from "../../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../../utils/chema";

export const ProfileOrdersHistory = () => {
    const { orders } = useAppSelector(store => store.ws);
    const dispatch = useAppDispatch();
    const token = localStorage.getItem("accessToken");
    let tokenValue;
    if(token) {
        const parts = token.split(' ');
        tokenValue = parts[1];
    }

    const wsUrl = ws + `/orders?token=${tokenValue}`;

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
        <div>
            <FeedList />
        </div>
    )
}
import Container from "../components/container/container";
import { FeedList } from "../components/feed";
import { Stats } from "../components/feed/stats";
import feedStyle from "./css/feed.module.css";
import { useEffect } from "react";
import feedListStyle from "./feed.module.css";
import { useAppDispatch, useAppSelector } from "../utils/chema";
import { ws } from "../utils/constants";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../services/actions/socket";

const Feed = () => {
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
        <Container >
            <div className={`${feedStyle.feed} pt-10 text pl-5 pr-5`}>
                <h1 className={feedStyle.h1}>Соберите бургер</h1>
                <FeedList />
                <Stats />
            </div>
        </Container>
    )
}

export default Feed;
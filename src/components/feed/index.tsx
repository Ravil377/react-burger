import feedListStyle from "./feed.module.css";
import { FeedOrder } from "./order";

export const FeedList = () => {

    return (
        <div className={`${feedListStyle.list} custom-scroll`}>
            <FeedOrder />
            <FeedOrder />
            <FeedOrder />
            <FeedOrder />
            <FeedOrder />
        </div>
    )
}
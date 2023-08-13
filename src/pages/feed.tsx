import Container from "../components/container/container";
import { FeedList } from "../components/feed";
import { Stats } from "../components/feed/stats";
import feedStyle from "./css/feed.module.css";

const Feed = () => {
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
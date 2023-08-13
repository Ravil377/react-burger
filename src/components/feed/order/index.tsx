import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import FeedOrderStyle from "./order.module.css";
import { Link, useParams } from "react-router-dom";

export const FeedOrder = () => {
    const { id } = useParams();
    return (
        <Link  
            to={`/feed/:034535`}
            className={`${FeedOrderStyle.order} p-6`}>
            <div className={FeedOrderStyle.orderTop}>
                <p className="text text_type_digits-default">#034535</p>
                <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20</p>
            </div>
            <div className='text text_type_main-medium mt-6'>Death Star Starship Main бургер</div>
            <div className={`${FeedOrderStyle.orderBottom} mt-6`}>
                <div className={`${FeedOrderStyle.orderIngredients}`}>
                    <div className={`${FeedOrderStyle.orderIngredient}`} style={{zIndex: '6'}}><img src="" alt="Ингредиент" /></div>
                    <div className={`${FeedOrderStyle.orderIngredient}`} style={{zIndex: '5', transform: "translatex(-16px)"}}><img src="" alt="Ингредиент" /></div>
                    <div className={`${FeedOrderStyle.orderIngredient}`} style={{zIndex: '4', transform: "translatex(-32px)"}}><img src="" alt="Ингредиент" /></div>
                    <div className={`${FeedOrderStyle.orderIngredient}`} style={{zIndex: '3', transform: "translatex(-48px)"}}><img src="" alt="Ингредиент" /></div>
                    <div className={`${FeedOrderStyle.orderIngredient}`} style={{zIndex: '2', transform: "translatex(-54px)"}}><img src="" alt="Ингредиент" /></div>
                    <div className={`${FeedOrderStyle.orderIngredient}`} style={{zIndex: '1', transform: "translatex(-70px)"}}>
                        <p className="text text_type_main-default">+3</p>
                        <img src="" alt="Ингредиент" />
                    </div>
                </div>
                <div className={FeedOrderStyle.orderCheck}>
                    <p className="text text_type_digits-default">480</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}
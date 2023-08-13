import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import FeedOrderStyle from "./order.module.css";
import { Link, useParams } from "react-router-dom";
import { TOrder, useAppSelector } from "../../../utils/chema";
import { FC } from "react";
import { filterById } from "../../../utils/utils";

interface IFeedOrderProps {
    order: TOrder;
}

export const FeedOrder:FC<IFeedOrderProps> = ({ order }) => {
    const { ingredients } = useAppSelector(state => state.ingredients);
    const { id } = useParams();
    const { name, number, updatedAt } = order;

    const sum = (): number => {
        let sum = 0;
        order.ingredients.map((ingredient) => {
            const i = filterById(ingredient, ingredients);
            if(i) sum = sum + i.price;
        })
        return sum;
    }

    return (
        <Link  
            to={`/feed/:${number}`}
            className={`${FeedOrderStyle.order} p-6`}>
            <div className={FeedOrderStyle.orderTop}>
                <p className="text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(updatedAt)} /></p>
            </div>
            <div className='text text_type_main-medium mt-6'>{name}</div>
            <div className={`${FeedOrderStyle.orderBottom} mt-6`}>
                <div className={`${FeedOrderStyle.orderIngredients}`}>
                    {order.ingredients.map((ingredient, idx) => 
                        idx <= 5 && (<div 
                            className={`${FeedOrderStyle.orderIngredient}`} 
                            key={idx}
                            style={{
                                zIndex: order.ingredients.length - idx,
                                transform: `translateX(-${idx * 16}px)`
                            }} >
                                <img src={filterById(ingredient, ingredients)?.image_mobile} alt="Ингредиент" />
                                {(idx === 5 && order.ingredients.length > 6) && <p className="text text_type_main-default">+{order.ingredients.length - 6}</p>}
                        </div>)
                    )}
                </div>
                <div className={FeedOrderStyle.orderCheck}>
                    <p className="text text_type_digits-default">{sum()}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}

import ingredientCardStyles from './ingredientCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';


export const IngredientCard = ({image, price, name, count}) => {
    return (
        <li className="pl-4 pr-4">
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            <img src={image} alt={name} />
            <p className={`text text_type_digits-default ${ingredientCardStyles.price}`}>{price}<CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-small ${ingredientCardStyles.name}`}>{name}</p>
        </li>
    )
}
IngredientCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};
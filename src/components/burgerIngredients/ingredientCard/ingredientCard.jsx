import ingredientCardStyles from './ingredientCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredient } from '../../../utils/propTypes';
import PropTypes from 'prop-types';


export const IngredientCard = ({ ingredient, count, modalOpen, openIngredientInModal }) => {
    
    const handleIngredientClick = (e) => {
        modalOpen();
        openIngredientInModal(e.currentTarget.id);
    }

    return (
        <li className={`pl-4 pr-4 ${ingredientCardStyles.ingredient}`} onClick={handleIngredientClick} id={ingredient._id} >
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            <img src={ingredient.image} alt={ingredient.name} />
            <p className={`text text_type_digits-default ${ingredientCardStyles.price}`}>{ingredient.price}<CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-small ${ingredientCardStyles.name}`}>{ingredient.name}</p>
        </li>
    )
}

IngredientCard.propTypes = {
    ingredient: PropTypes.shape(ingredient).isRequired,
    count: PropTypes.number.isRequired,
    modalOpen: PropTypes.func.isRequired,
    openIngredientInModal: PropTypes.func.isRequired,
};



import burgerConstructorStyles from './burgerConstructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes, selectIngredientsPropTypes } from '../../utils/propTypes';
import PropTypes from 'prop-types';
import { Bun } from './bun/bun';
import { ConstructorList } from './constructorList/constructorList';

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
    selectIngredients: PropTypes.arrayOf(selectIngredientsPropTypes).isRequired,
};
  
function BurgerConstructor({ingredients, selectIngredients}) {
    const filterByType = (type, ingredient) => ingredient.filter(item => item.type === type);

    return (
        <section className={`custom-scroll ${burgerConstructorStyles.constructor}`} >
            <Bun bun={filterByType('bun', ingredients)} positionText="(верх)" position={"top"} className={`${burgerConstructorStyles.top}`} />
            <div className={`custom-scroll mt-4 mb-4 pr-4 ${burgerConstructorStyles.list}`} >
                <ConstructorList ingredients={ingredients} selectIngredients={selectIngredients} />
            </div>            
            <Bun bun={filterByType('bun', ingredients)} positionText="(низ)" position={"bottom"} className={burgerConstructorStyles.bottom} />
            <div className={`mt-10 ${burgerConstructorStyles.buttons}`}>
                <p className={`text text_type_digits-medium ${burgerConstructorStyles.result}`}>610 
                    <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>

        </section>
    );
}

export default BurgerConstructor;
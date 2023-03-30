import React from "react";
import burgerConstructorStyles from './burgerConstructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const ingredientsPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
});


const Bun = ({bun, position}) => {
    return (
        <ConstructorElement
            type={position}
            isLocked={true}
            text={bun[0].name}
            price={bun[0].price}
            thumbnail={bun[0].image}
            extraClass="mr-7"
        />        
    )
}

Bun.propTypes = {
    bun: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
    position: PropTypes.string.isRequired,
};

const ConstructorList = ({ingredients}) => {

    return (
        <>
        {ingredients.map(component => 
            <div className={burgerConstructorStyles.ingredients}>
                <button className={burgerConstructorStyles.button}>
                    <DragIcon type="primary" />
                </button>
                <ConstructorElement
                    text={component.name}
                    price={component.price}
                    thumbnail={component.image}
                />
            </div>
        ) }        
        </>
    )
}

ConstructorList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
};


BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
    selectIngredients: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
        })
    ).isRequired
};
  
function BurgerConstructor({ingredients, selectIngredients}) {
    const filterByType = (type, ingredient) => ingredient.filter(item => item.type === type);

    return (
        <section className={`custom-scroll ${burgerConstructorStyles.constructor}`} >
            <Bun bun={filterByType('bun', ingredients)} position={"top"} className={`${burgerConstructorStyles.top}`} />
            <div className={`custom-scroll mt-4 mb-4 pr-4 ${burgerConstructorStyles.list}`} >
                <ConstructorList ingredients={ingredients} selectIngredients={selectIngredients} />
            </div>            
            <Bun bun={filterByType('bun', ingredients)} position={"bottom"} className={burgerConstructorStyles.bottom} />
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
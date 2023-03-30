import React from "react";
import burgerConstructorStyles from './burgerConstructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const Bun = ({bun, position}) => {
    return (
        <ConstructorElement
            type={position}
            isLocked={true}
            text={bun[0].name}
            price={bun[0].fat}
            thumbnail={bun[0].image}
            extraClass="mr-7"
        />        
    )
}

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
                    price={component.fat}
                    thumbnail={component.image}
                />
            </div>
        ) }        
        </>
    )
  }

function BurgerConstructor(props) {
    const filterByType = (type, ingredients) => ingredients.filter(item => item.type === type);

    return (
        <section className={`custom-scroll ${burgerConstructorStyles.constructor}`} >
            <Bun bun={filterByType('bun', props.ingredients)} position={"top"} className={`${burgerConstructorStyles.top}`} />
            <div className={`custom-scroll mt-4 mb-4 pr-4 ${burgerConstructorStyles.list}`} >
                <ConstructorList ingredients={props.ingredients} selectIngredients={props.selectIngredient} />
            </div>            
            <Bun bun={filterByType('bun', props.ingredients)} position={"bottom"} className={burgerConstructorStyles.bottom} />
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
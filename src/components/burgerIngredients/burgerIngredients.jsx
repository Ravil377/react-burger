import React, { Children, useState } from "react";
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { Tab, CurrencyIcon, Counter, BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {TAB1, TAB2, TAB3} from '../../utils/constants';

const TabPanel = () => {
    const [current, setCurrent] = React.useState('bun')

    const scrollToIngredient = (value) => {
        setCurrent(value);
        const type = document.getElementById(value);
        type.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div style={{ display: 'flex' }}>
            <Tab value="bun" active={current === 'bun'} onClick={scrollToIngredient}>
                {TAB1}
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={scrollToIngredient}>
                {TAB2}
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={scrollToIngredient}>
                {TAB3}
            </Tab>
        </div>
    )
}

const TabContent = (props) => {
    return (
        <div className={`custom-scroll ${burgerIngredientsStyles.content}`}>
            {props.children}
        </div>
    )
}

const IngredientCard = ({image, fat, name, count}) => {
    console.log(count, name)
    return (
        <li className="pl-4 pr-4">
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            <img src={image} alt={name} />
            <p className={`text text_type_digits-default ${burgerIngredientsStyles.price}`}>{fat}<CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-small ${burgerIngredientsStyles.name}`}>{name}</p>
        </li>
    )
}

const IngredientList = ({type, ingredients, id, selectIngredients}) => {
    const isSelected = (id) => {
        let res = selectIngredients.find(select => select.id === id && select);
        return res ? res.count : 0;
    }

    return (
        <>
            <h2 className="type text text_type_main-medium pt-10" id={id}>{type}</h2>
            <ul className={`pl-4 pr-4 pt-6 ${burgerIngredientsStyles.list}`} >
                {ingredients.map(item => 

                    <IngredientCard 
                        key={item._id}
                        image={item.image}
                        fat={item.fat}
                        name={item.name}
                        count={isSelected(item._id)}
                    />
                )}
            </ul>
        </>
    )
}





function BurgerIngredients(props) {
    const [selectIngredient, setSelectIngredient] = useState([{id: '60666c42cc7b410027a1a9b1', count: 1}, {id:'60666c42cc7b410027a1a9b9', count: 1}]);

    const filterByType = (type) => props.ingredients.filter(item => item.type === type);

    return (
        <section className="ingredients">
            <TabPanel />
            <TabContent >
                <IngredientList type={"Булки"} ingredients={filterByType('bun')} id={"bun"} selectIngredients={selectIngredient} />
                <IngredientList type={"Соусы"} ingredients={filterByType('sauce')} id={"sauce"} selectIngredients={selectIngredient} />
                <IngredientList type={"Начинки"} ingredients={filterByType('main')} id={"main"} selectIngredients={selectIngredient} />
            </TabContent>
        </section>
    );
}

export default BurgerIngredients;






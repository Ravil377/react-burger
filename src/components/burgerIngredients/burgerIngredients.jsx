import React, { useRef } from 'react';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import {TAB1, TAB2, TAB3} from '../../utils/constants';

const TabPanel = (props) => {
    const [current, setCurrent] = React.useState('bun')

    const scrollToIngredient = (refIndex) => props.refs[refIndex].current.scrollIntoView({ behavior: 'smooth' });

    return (
        <div style={{ display: 'flex' }}>
            <Tab value="bun" active={current === 'bun'} onClick={()=>{setCurrent('bun'); scrollToIngredient(0)}}>
                {TAB1}
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={()=>{setCurrent('sauce'); scrollToIngredient(1)}}>
                {TAB2}
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={()=>{setCurrent('main'); scrollToIngredient(2)}}>
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
    return (
        <li className="pl-4 pr-4">
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            <img src={image} alt={name} />
            <p className={`text text_type_digits-default ${burgerIngredientsStyles.price}`}>{fat}<CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-small ${burgerIngredientsStyles.name}`}>{name}</p>
        </li>
    )
}

const IngredientList = ({type, ingredients, id, selectIngredients, refs}) => {
    const isSelected = (id) => {
        let res = selectIngredients.find(select => select.id === id && select);
        return res ? res.count : 0;
    }

    return (
        <>
            <h2 className="type text text_type_main-medium pt-10" ref={refs[id]}>{type}</h2>
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
    const refs = [
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const filterByType = (type) => props.ingredients.filter(item => item.type === type);

    return (
        <section className={burgerIngredientsStyles.ingredients}>
            <TabPanel refs={refs} />
            <TabContent >
                <IngredientList type={"Булки"} refs={refs} ingredients={filterByType('bun')} id={0} selectIngredients={props.selectIngredients} />
                <IngredientList type={"Соусы"} refs={refs} ingredients={filterByType('sauce')} id={1} selectIngredients={props.selectIngredients} />
                <IngredientList type={"Начинки"} refs={refs} ingredients={filterByType('main')} id={2} selectIngredients={props.selectIngredients} />
            </TabContent>
        </section>
    );
}

export default BurgerIngredients;






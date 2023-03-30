import React, { useRef } from 'react';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import {TAB1, TAB2, TAB3} from '../../utils/constants';
import { ingredientsPropTypes } from '../burgerConstructor/burgerConstructor';
import PropTypes from 'prop-types';

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

TabPanel.propTypes = {
    refs: PropTypes.shape({
        bun: PropTypes.object,
        sauce: PropTypes.object,
        main: PropTypes.object,
    }).isRequired
};


const TabContent = (props) => {
    return (
        <div className={`custom-scroll ${burgerIngredientsStyles.content}`}>
            {props.children}
        </div>
    )
}
TabContent.propTypes = {
    children: PropTypes.func.isRequired,
};

const IngredientCard = ({image, price, name, count}) => {
    return (
        <li className="pl-4 pr-4">
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            <img src={image} alt={name} />
            <p className={`text text_type_digits-default ${burgerIngredientsStyles.price}`}>{price}<CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-small ${burgerIngredientsStyles.name}`}>{name}</p>
        </li>
    )
}

IngredientCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};

const IngredientList = ({ id, selectIngredients, type, refs, ingredients }) => {
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
                        price={item.price}
                        name={item.name}
                        count={isSelected(item._id)}
                    />
                )}
            </ul>
        </>
    )
}

IngredientList.propTypes = {
    type: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
    id: PropTypes.string.isRequired,
    selectIngredients: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
        })
    ).isRequired,
    refs: PropTypes.shape({
        bun: PropTypes.object,
        sauce: PropTypes.object,
        main: PropTypes.object,
    }).isRequired
};

function BurgerIngredients({ingredients, selectIngredients}) {
    const refs = [
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const filterByType = (type) => ingredients.filter(item => item.type === type);

    return (
        <section className={burgerIngredientsStyles.ingredients}>
            <TabPanel refs={refs} />
            <TabContent >
                <IngredientList type={"Булки"} refs={refs} ingredients={filterByType('bun')} id={0} selectIngredients={selectIngredients} />
                <IngredientList type={"Соусы"} refs={refs} ingredients={filterByType('sauce')} id={1} selectIngredients={selectIngredients} />
                <IngredientList type={"Начинки"} refs={refs} ingredients={filterByType('main')} id={2} selectIngredients={selectIngredients} />
            </TabContent>
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
    selectIngredients: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
        })
    ).isRequired
};

export default BurgerIngredients;






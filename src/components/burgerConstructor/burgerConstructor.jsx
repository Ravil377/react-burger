import { useContext, useEffect } from 'react';
import burgerConstructorStyles from './burgerConstructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Bun } from './bun/bun';
import { ConstructorList } from './constructorList/constructorList';
import { filterByType } from '../../utils/utils';
import { IngredientContext } from '../../utils/ingredientContext';
import api from '../../utils/api';
import { checkBun } from '../../utils/utils';

BurgerConstructor.propTypes = {
    modalOpen: PropTypes.func.isRequired,
};
 
function BurgerConstructor({ modalOpen }) {
    const { ingredients, setIngredients } = useContext(IngredientContext);  

    useEffect(() => {
        setIngredients({
            ...ingredients,
            order: ingredients.selectIngredients.reduce((acc, obj) => acc + obj.price, 0)
        })
    },[ingredients.selectIngredients])
    
    const handleClickOrderBtn = () => {
        api.postOrder( ingredients.selectIngredients.map((item) => item._id) )
        .then((res)=> {
            setIngredients({
                ...ingredients,
                postOrder: res
            })
            modalOpen();
        })
        .catch((err) => console.log(err));
    }

    return (
        <section className={`custom-scroll ${burgerConstructorStyles.constructor}`} >
            {checkBun(ingredients.selectIngredients) !== -1 && <Bun bun={filterByType('bun', ingredients.selectIngredients)} positionText="(верх)" position={"top"} />}
            <div className={`custom-scroll mt-4 mb-4 pr-4 ${burgerConstructorStyles.list}`} >
            {ingredients.selectIngredients && <ConstructorList />}
            </div>            
            {checkBun(ingredients.selectIngredients) !== -1 && <Bun bun={filterByType('bun', ingredients.selectIngredients)} positionText="(низ)" position={"bottom"} />}
            <div className={`mt-10 ${burgerConstructorStyles.buttons}`}>
                <p className={`text text_type_digits-medium ${burgerConstructorStyles.result}`}>{ingredients.order} 
                    <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large" onClick={handleClickOrderBtn}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;
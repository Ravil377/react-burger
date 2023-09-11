import burgerConstructorStyles from './burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Bun } from './bun/bun';
import { ConstructorList } from './constructorList/constructor-list';
import { filterByType, checkBun } from '../../utils/utils';
import { getOrder } from '../../services/actions/order';
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT } from '../../services/actions/burger-constructor';
import { INGREDIENT_INCREMENT, INGREDIENT_DECREMENT } from '../../services/actions/ingredients';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { IIngredient, useAppDispatch, useAppSelector } from '../../utils/chema';

function BurgerConstructor() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const { selectIngred, user } = useAppSelector( state => ({ 
        selectIngred: state.selectIngredients,
        user: state.user.user
    }) );

    const isAuthChecked = useAppSelector( state => state.user.isAuthCheck );

    const { selectIngredients, order } = selectIngred;

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: IIngredient) {
            const key = uuidv4();
            const isBun = item.type === "bun";
            const isBunPrevState = checkBun(selectIngredients);
            let prevBun;
            
            if( isBun && isBunPrevState !== -1 ) {
                prevBun = selectIngredients[isBunPrevState];
            }
            dispatch({ type: ADD_INGREDIENT, ingredient: {...item, key: key} });
            if (isBun && isBunPrevState !== -1 && prevBun) {
                dispatch({ type: INGREDIENT_INCREMENT, id: item._id });
                dispatch({ type: INGREDIENT_DECREMENT, id: prevBun._id });
            } else {
                dispatch({ type: INGREDIENT_INCREMENT, id: item._id });
            }
        }
    });


    const handleClickOrderBtn = () => {
        if(isAuthChecked && user) {
            dispatch(getOrder(selectIngredients));    
        } else {
            navigate('/login')
        }
        
    }
 
    return (
        <section data-testid="constructor" className={`custom-scroll ${burgerConstructorStyles.constructor}`} ref={dropTarget} >
            {checkBun(selectIngredients) !== -1 && <Bun bun={filterByType('bun', selectIngredients)} positionText="(верх)" position={"top"} />}
            <div className={`custom-scroll mt-4 mb-4 pr-4 ${burgerConstructorStyles.list}`} >
            {selectIngredients && <ConstructorList />}
            </div>            
            {checkBun(selectIngredients) !== -1 && <Bun bun={filterByType('bun', selectIngredients)} positionText="(низ)" position={"bottom"} />}
            <div className={`mt-10 ${burgerConstructorStyles.buttons}`}>
                <p className={`text text_type_digits-medium ${burgerConstructorStyles.result}`}>{order} 
                    <CurrencyIcon type="primary" />
                </p>
                <Button data-testid="makeOrder" htmlType="button" type="primary" size="large" onClick={handleClickOrderBtn}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;
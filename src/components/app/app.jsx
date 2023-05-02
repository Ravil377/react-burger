import React from "react";
import AppHeader from '../appHeader/app-header';
import Container from '../container/container';
import BurgerIngredients from '../burgerIngredients/burger-ingredients';
import BurgerConstructor from '../burgerConstructor/burger-constructor';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredientDetails/ingredient-details';
import { OrderDetails } from '../orderDetails/order-details';
import appStyles from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function App() {
  const { order, ingredients, isLoading, isError, ingredientDetail } = useSelector(
    state => ({
      order: state.order.order,
      ingredients: state.ingredients.ingredients,
      selectIngredients: state.selectIngredients,
      ingredientDetail: state.ingredientDetail.selectIngredientForDetail
    })
  );

  const dispatch = useDispatch();
  
  React.useEffect(() => dispatch(getIngredients()), [dispatch]);

  return (
    <>
        <AppHeader />
        <main>
          <DndProvider backend={HTML5Backend}>
            <Container >
              <div className={`${appStyles.main} pt-10 text pl-5 pr-5`}>
                <h1 className={appStyles.h1}>Соберите бургер</h1>
                {(!isLoading && !isError && ingredients.length) 
                ? <>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </>
                : ''
                }
              </div>
            </Container>
          </DndProvider>
          {(ingredientDetail || order) &&
            <Modal >
              {ingredientDetail 
                ? <IngredientDetails />
                : <OrderDetails />
              }
            </Modal>
          }
        </main>
    </>
    
  );
}
import React from "react";
import { useState } from "react";
import AppHeader from '../appHeader/app-header';
import Container from '../container/container';
import BurgerIngredients from '../burgerIngredients/burger-ingredients';
import BurgerConstructor from '../burgerConstructor/burger-constructor';
import api from '../../utils/api';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredientDetails/ingredient-details';
import { OrderDetails } from '../orderDetails/order-details';
import { IngredientContext } from '../../utils/ingredient-context';
import appStyles from './app.module.css';

export function App() {
  const [showModal, setShowModal] = useState(false);

  const [ingredients, setIngredients] = useState({
    isLoading: false,
    isError: false,
    textError: '',
    data: [],
    selectIngredients: [],
    order: 0,
    postOrder: null,
    ingredientForModal: null
  })
  
  const modalOpen = () => setShowModal(true);

  const modalClose = () => {
    setShowModal(false);
    setIngredients({...ingredients, ingredientForModal: null})
  }

  React.useEffect(() => {
    setIngredients({ ...ingredients, isLoading: true, isError: false, textError: '' });
    api.getInitialIngredients()
        .then((res) => {
            setIngredients({ ...ingredients, isLoading: false, data: res.data });
        })
        .catch((err) => setIngredients({ ...ingredients, isLoading: false, isError: true, textError: err }));
  }, []);

  return (
      <IngredientContext.Provider value={{ ingredients, setIngredients }}>
        <AppHeader />
        <main>
          <Container >
            <div className={`${appStyles.main} pt-10 text pl-5 pr-5`}>
              <h1 className={appStyles.h1}>Соберите бургер</h1>
              {(!ingredients.isLoading && !ingredients.isError && ingredients.data.length) 
              ? <>
                  <BurgerIngredients modalOpen={modalOpen} />
                  <BurgerConstructor modalOpen={modalOpen} />
                </>
              : ''
              }
            </div>
          </Container>
          {showModal &&
            <Modal showModal={showModal} modalClose={modalClose} >
              {ingredients.ingredientForModal 
                ? <IngredientDetails />
                : <OrderDetails />
              }
            </Modal>
          }
        </main>
      </IngredientContext.Provider>
  );
}
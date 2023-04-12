import React from "react";
import './app.css';
import { useState } from "react";
import AppHeader from '../appHeader/appHeader';
import Container from '../container/container';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import api from '../../utils/api';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredientDetails/ingredientDetails';
import { OrderDetails } from '../orderDetails/orderDetails';
import { IngredientContext } from '../../utils/ingredientContext';
import PropTypes from 'prop-types';

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
      <IngredientContext.Provider value={{ ingredients: ingredients ? ingredients : {}, setIngredients }}>
        <AppHeader />
        <main>
          <Container >
            <div className='main pt-10 text pl-5 pr-5'>
              <h1>Соберите бургер</h1>
              {(!ingredients.isLoading && !ingredients.isError && ingredients.data.length) 
              ? <>
                  <BurgerIngredients 
                      modalOpen={modalOpen}
                  />
                  <BurgerConstructor 
                    modalOpen={modalOpen}
                  />
                </>
              : ''
              }
            </div>
          </Container>
          {showModal &&
            <>
              <Modal showModal={showModal} modalClose={modalClose} >
                {ingredients.ingredientForModal 
                  ? <IngredientDetails />
                  : <OrderDetails />
                }
              </Modal>
            </>
          }
        </main>
      </IngredientContext.Provider>
  );
}

IngredientContext.propTypes = {
  value: PropTypes.shape({
    ingredients: IngredientContext.propTypes.ingredients.isRequired,
    setIngredients: IngredientContext.propTypes.setIngredients.isRequired,
  }).isRequired,
};
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


export function App() {
  const [selectIngredient, setSelectIngredient] = useState([]);
  const [selectIngredientForModal, setSelectIngredientForModal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [ingredients, setIngredients] = useState({
    isLoading: false,
    isError: false,
    textError: '',
    data: []
  })
  
  const modalOpen = () => setShowModal(true);

  const modalClose = () => {
    setShowModal(false);
    setSelectIngredientForModal(null);
  }

  const openIngredientInModal = (id) => {
    const ingredient = ingredients.data.find(ingredient => ingredient._id === id);
    setSelectIngredientForModal(ingredient);
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
    <>
      <AppHeader />
      <main>
        <Container >
          <div className='main pt-10 text pl-5 pr-5'>
            <h1>Соберите бургер</h1>
            {(!ingredients.isLoading && !ingredients.isError && ingredients.data.length) 
            ? <>
                <BurgerIngredients 
                    ingredients={ingredients.data} 
                    selectIngredients={selectIngredient} 
                    modalOpen={modalOpen}
                    openIngredientInModal={openIngredientInModal}
                />
                <BurgerConstructor 
                  ingredients={ingredients.data} 
                  selectIngredients={selectIngredient}
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
              {selectIngredientForModal 
                ? <IngredientDetails ingredient={selectIngredientForModal} />
                : <OrderDetails />
              }
            </Modal>
          </>
        }
      </main>
    </>
  );
}
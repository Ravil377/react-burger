import React from "react";
import AppHeader from '../appHeader/app-header';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredientDetails/ingredient-details';
import { OrderDetails } from '../orderDetails/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { checkUserAuth } from '../../services/actions/user';
import { Routes, Route, useLocation } from 'react-router-dom';
import Main from '../../pages/main';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import {OnlyAuth, OnlyUnAuth} from '../protectedRoute';

export function App() {
  const { order } = useSelector(
    state => ({
      order: state.order.order,
      ingredients: state.ingredients.ingredients,
      selectIngredients: state.selectIngredients
    })
  );
  const dispatch = useDispatch();
  const location = useLocation();
  let state = location.state;
  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
      <>
        <AppHeader />
        <main>
          <Routes location={state?.backgroundLocation || location}>
            <Route path="/" element={<Main />}/>
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
            <Route path="/login" element={<OnlyUnAuth component={<Login />}/>}/>
            <Route path="/register" element={<OnlyUnAuth component={<Register />}/>}/>
            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />}/>}/>
            <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />}/>}/>
            <Route 
              path="/profile" 
              element={<OnlyAuth component={<Profile />}/>}
            />
          </Routes>          
        </main>
        {state?.backgroundLocation && (
            <Routes >
              <Route path="/ingredients/:id" element={<Modal ><IngredientDetails /></Modal>} />
            </Routes>
        )}
        {order &&
          <Modal >
            <OrderDetails />
          </Modal>
        }
      </>
  );
}

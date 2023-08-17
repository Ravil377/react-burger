import React, { useEffect, useState } from "react";
import AppHeader from '../appHeader/app-header';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredientDetails/ingredient-details';
import { OrderDetails } from '../orderDetails/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { checkUserAuth, getUser } from '../../services/actions/user';
import { Routes, Route, useLocation } from 'react-router-dom';
import Main from '../../pages/main';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import {OnlyAuth, OnlyUnAuth} from '../protectedRoute';
import Feed from "../../pages/feed";
import { OrderDetailsWithIngredient } from "../orderDetailWithIngredient";
import { useAppDispatch, useAppSelector } from "../../utils/chema";
import { ws } from "../../utils/constants";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_STOP } from "../../services/actions/socket";
import { ProfileUser } from "../profile/ProfileUser";
import { ProfileOrdersHistory } from "../profile/ProfileOrdersHistory";

export function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  let state = location.state;

  const { order, orders } = useAppSelector(
    store => ({
      order: store.order.order,
      orders: store.ws
    })
  );

  const [isFeed, setIsFeed] = useState<Boolean>(false)
  const wsUrl = ws + '/orders/all';
  
  useEffect(()=>{
    if(isFeed) {
      dispatch({
          type: WS_CONNECTION_START,
          payload: wsUrl
      });

      return () => {
          dispatch({
              type: WS_CONNECTION_STOP
          });
      };
    }
  },[isFeed])

  useEffect(() => {
    let feed_value;
    if(state) {
      const pathname = state["backgroundLocation"]["pathname"];
      feed_value = pathname.split("/")[1];
    }
 

    dispatch(getIngredients());
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser());
    } else {
      dispatch(checkUserAuth());
    }
    if(feed_value === "feed" && !orders) {
      setIsFeed(true);
    }
  }, [dispatch]);



  return (
      <>
        <AppHeader />
        <main>
          <Routes location={state?.backgroundLocation || location}>
            <Route path="/" element={<Main />}/>
            <Route path="/feed" element={<Feed />}/>
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
            <Route path="/login" element={<OnlyUnAuth component={<Login />}/>}/>
            <Route path="/feed/:id" element={<OrderDetailsWithIngredient />} />
            <Route path="/profile/orders/:id" element={<OrderDetailsWithIngredient />} />
            <Route path="/register" element={<OnlyUnAuth component={<Register />}/>}/>
            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />}/>}/>
            <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />}/>}/>
            <Route path="/profile" element={<OnlyAuth component={<Profile />}/>}>
                <Route index element={<ProfileUser />} />
                <Route path="orders" element={<ProfileOrdersHistory />} />
            </Route>
          </Routes>       
          
             
        </main>
        
        {state?.backgroundLocation && (
            <Routes>
              <Route path="/ingredients/:id" element={<Modal><IngredientDetails /></Modal>} />
              <Route path="/feed/:id" element={<Modal><OrderDetailsWithIngredient /></Modal>} />
              <Route path="/profile/orders/:id" element={<Modal><OrderDetailsWithIngredient /></Modal>} />
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

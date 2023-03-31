import './app.css';
import { useState } from "react";
import AppHeader from '../appHeader/appHeader';
import Container from '../container/container';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import {ingredients} from '../../utils/constants';

export function App() {
  const [selectIngredient, setSelectIngredient] = useState([{id: '60666c42cc7b410027a1a9b1', count: 1}, {id:'60666c42cc7b410027a1a9b9', count: 1}]);

  return (
    <>
      <AppHeader />
      <main>
        <Container >
          <div className='main pt-10 text pl-5 pr-5'>
            <h1>Соберите бургер</h1>
            <BurgerIngredients ingredients={ingredients} selectIngredients={selectIngredient}/>
            <BurgerConstructor ingredients={ingredients} selectIngredients={selectIngredient}/>
          </div>
        </Container>
      </main>
    </>
  );
}
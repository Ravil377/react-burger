import './App.css';
import AppHeader from './components/appHeader/appHeader';
import Container from './components/container/container';
import BurgerIngredients from './components/burgerIngredients/burgerIngredients';
import BurgerConstructor from './components/burgerConstructor/burgerConstructor';
import {ingredients} from './utils/constants';

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <Container>
          <div className='main pt-10 pl-5 pr-5 text'>
            <h1>Соберите бургер</h1>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor />
          </div>
        </Container>
      </main>
    </>
  );
}

export default App;

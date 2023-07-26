import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from '../components/container/container';
import BurgerIngredients from '../components/burgerIngredients/burger-ingredients';
import BurgerConstructor from '../components/burgerConstructor/burger-constructor';
import { useSelector } from 'react-redux';
import mainStyles from './css/main.module.css';

function Main() {
    // @ts-ignore
    const {  ingredients, isLoading, isError } = useSelector(
        state => ({
          // @ts-ignore
          ingredients: state.ingredients.ingredients,
          // @ts-ignore
          selectIngredients: state.selectIngredients
        })
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <Container >
                <div className={`${mainStyles.main} pt-10 text pl-5 pr-5`}>
                    <h1 className={mainStyles.h1}>Соберите бургер</h1>
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
    );
}

export default Main;
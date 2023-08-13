import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from '../components/container/container';
import BurgerIngredients from '../components/burgerIngredients/burger-ingredients';
import BurgerConstructor from '../components/burgerConstructor/burger-constructor';
import mainStyles from './css/main.module.css';
import { useAppSelector } from "../utils/chema";

function Main() {
    const {  data } = useAppSelector( store => ({ data: store.ingredients }));
    const { isLoading, isError, ingredients } = data;

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
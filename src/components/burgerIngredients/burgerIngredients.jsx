import { useRef } from 'react';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import PropTypes from 'prop-types';
import { TabPanel } from './tabPanel/tabPanel';
import { TabContent } from './tabContent/tabContent';
import { IngredientList } from './ingredientList/ingredientList';

function BurgerIngredients({ modalOpen }) {
    const refs = [
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    return (
        <section className={burgerIngredientsStyles.ingredients}>
            <TabPanel refs={refs} />
            <TabContent >
                <IngredientList 
                    title={"Булки"} 
                    refs={refs}
                    type={"bun"}
                    refId={0} 
                    modalOpen={modalOpen}
                />
                <IngredientList 
                    title={"Соусы"} 
                    refs={refs} 
                    type={"sauce"}
                    refId={1} 
                    modalOpen={modalOpen}
                />
                <IngredientList 
                    title={"Начинки"} 
                    type={"main"}
                    refs={refs} 
                    refId={2} 
                    modalOpen={modalOpen} 
                />
            </TabContent>
        </section>
    );
}

BurgerIngredients.propTypes = {
    modalOpen: PropTypes.func.isRequired,
};

export default BurgerIngredients;






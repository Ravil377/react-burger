import { useRef } from 'react';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { ingredientsPropTypes, selectIngredientsPropTypes } from '../../utils/propTypes';
import PropTypes from 'prop-types';
import { TabPanel } from './tabPanel/tabPanel';
import { TabContent } from './tabContent/tabContent';
import { IngredientList } from './ingredientList/ingredientList';

function BurgerIngredients({ingredients, selectIngredients, modalOpen, openIngredientInModal}) {
    const refs = [
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const filterByType = (type) => ingredients.filter(item => item.type === type);

    return (
        <section className={burgerIngredientsStyles.ingredients}>
            <TabPanel refs={refs} />
            <TabContent >
                <IngredientList 
                    type={"Булки"} 
                    refs={refs} 
                    ingredients={filterByType('bun')} 
                    id={0} 
                    selectIngredients={selectIngredients} 
                    modalOpen={modalOpen}
                    openIngredientInModal={openIngredientInModal}
                />
                <IngredientList 
                    type={"Соусы"} 
                    refs={refs} 
                    ingredients={filterByType('sauce')} 
                    id={1} 
                    selectIngredients={selectIngredients} 
                    modalOpen={modalOpen}
                    openIngredientInModal={openIngredientInModal}
                />
                <IngredientList 
                    type={"Начинки"} 
                    refs={refs} 
                    ingredients={filterByType('main')} 
                    id={2} 
                    selectIngredients={selectIngredients} 
                    modalOpen={modalOpen} 
                    openIngredientInModal={openIngredientInModal}
                />
            </TabContent>
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
    selectIngredients: PropTypes.arrayOf(selectIngredientsPropTypes).isRequired,
    openIngredientInModal: PropTypes.func.isRequired,
    modalOpen: PropTypes.func.isRequired,
};

export default BurgerIngredients;






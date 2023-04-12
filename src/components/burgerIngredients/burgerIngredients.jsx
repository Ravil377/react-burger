import React, { useContext, useRef } from 'react';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { ingredientsPropTypes, selectIngredientsPropTypes } from '../../utils/propTypes';
import PropTypes from 'prop-types';
import { TabPanel } from './tabPanel/tabPanel';
import { TabContent } from './tabContent/tabContent';
import { IngredientList } from './ingredientList/ingredientList';

function BurgerIngredients({ modalOpen, openIngredientInModal }) {
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
                    // openIngredientInModal={openIngredientInModal}
                />
                <IngredientList 
                    title={"Соусы"} 
                    refs={refs} 
                    type={"sauce"}
                    refId={1} 
                    modalOpen={modalOpen}
                    // openIngredientInModal={openIngredientInModal}
                />
                <IngredientList 
                    title={"Начинки"} 
                    type={"main"}
                    refs={refs} 
                    refId={2} 
                    modalOpen={modalOpen} 
                    // openIngredientInModal={openIngredientInModal}
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






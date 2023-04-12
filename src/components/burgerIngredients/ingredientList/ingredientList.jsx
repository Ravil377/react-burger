import React, { useContext } from 'react';
import ingredientListStyles from './ingredientList.module.css';
import { ingredientsPropTypes, selectIngredientsPropTypes, refsPropTypes } from '../../../utils/propTypes';
import PropTypes from 'prop-types';
import { IngredientCard } from '../ingredientCard/ingredientCard';
import { IngredientContext } from '../../../utils/ingredientContext';
import { filterByType } from '../../../utils/utils';

export const IngredientList = ({ refId, type, title, refs, modalOpen, openIngredientInModal }) => {
    
    const { ingredients, setIngredients } = useContext(IngredientContext); 
    
    const isSelected = (_id) => {
        let res = ingredients.selectIngredients.find(select => select.id === _id && select);
        return res ? res.count : 0;
    }
     

    return (
        <>
            <h2 className="type text text_type_main-medium pt-10" ref={refs[refId]}>{title}</h2>
            <ul className={`pl-4 pr-4 pt-6 ${ingredientListStyles.list}`} >
                {filterByType(type, ingredients.data).map((item, idx) => 
                    <IngredientCard 
                        key={`${item._id}-${Math.random()}`}
                        ingredient={item}
                        count={isSelected(item._id)}
                        modalOpen={modalOpen}
                        // openIngredientInModal={openIngredientInModal}
                    />
                )}
            </ul>
        </>
    )
}
IngredientList.propTypes = {
    type: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
    refId: PropTypes.number.isRequired,
    selectIngredients: PropTypes.arrayOf(selectIngredientsPropTypes).isRequired,
    refs: PropTypes.arrayOf(refsPropTypes).isRequired,
    openIngredientInModal: PropTypes.func.isRequired,
    modalOpen: PropTypes.func.isRequired,
};
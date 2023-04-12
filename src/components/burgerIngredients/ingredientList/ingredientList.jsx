import { useContext } from 'react';
import ingredientListStyles from './ingredientList.module.css';
import { refsPropTypes } from '../../../utils/propTypes';
import PropTypes from 'prop-types';
import { IngredientCard } from '../ingredientCard/ingredientCard';
import { IngredientContext } from '../../../utils/ingredientContext';
import { filterByType } from '../../../utils/utils';

export const IngredientList = ({ refId, type, title, refs, modalOpen }) => {
    
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
                    />
                )}
            </ul>
        </>
    )
}
IngredientList.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    refId: PropTypes.number.isRequired,
    refs: PropTypes.arrayOf(refsPropTypes).isRequired,
    modalOpen: PropTypes.func.isRequired,
};
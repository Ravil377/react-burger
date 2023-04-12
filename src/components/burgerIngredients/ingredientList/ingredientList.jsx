import ingredientListStyles from './ingredientList.module.css';
import { ingredientsPropTypes, selectIngredientsPropTypes, refsPropTypes } from '../../../utils/propTypes';
import PropTypes from 'prop-types';
import { IngredientCard } from '../ingredientCard/ingredientCard';

export const IngredientList = ({ refId, selectIngredients, type, refs, ingredients, modalOpen, openIngredientInModal }) => {
    const isSelected = (_id) => {
        let res = selectIngredients.find(select => select.id === _id && select);
        return res ? res.count : 0;
    }
    return (
        <>
            <h2 className="type text text_type_main-medium pt-10" ref={refs[refId]}>{type}</h2>
            <ul className={`pl-4 pr-4 pt-6 ${ingredientListStyles.list}`} >
                {ingredients.map(item => 
                    <IngredientCard 
                        key={item._id}
                        ingredient={item}
                        count={isSelected(item._id)}
                        modalOpen={modalOpen}
                        openIngredientInModal={openIngredientInModal}
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
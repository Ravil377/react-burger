import ingredientListStyles from './ingredient-list.module.css';
import { refsPropTypes } from '../../../utils/prop-types';
import PropTypes from 'prop-types';
import { IngredientCard } from '../ingredientCard/ingredient-card';
import { filterByType } from '../../../utils/utils';
import { useSelector } from 'react-redux';

export const IngredientList = ({ refId, type, title, refs }) => {
    const { ingredients } = useSelector(
        state => ({
          ingredients: state.ingredients,
          selectIngredients: state.selectIngredients,
          ingredientDetail: state.selectIngredientForDetail
        })
    );
    
    return (
        <>
            <h2 data-tab={type} className="type text text_type_main-medium pt-10" ref={refs[refId]}>{title}</h2>
            <ul className={`pl-4 pr-4 pt-6 ${ingredientListStyles.list}`} >
                {filterByType(type, ingredients.ingredients).map((item) => 
                    <IngredientCard 
                        key={`${item._id}-${Math.random()}`}
                        ingredient={item}
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
    refs: PropTypes.arrayOf(refsPropTypes).isRequired
};
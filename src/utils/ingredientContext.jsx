import { createContext } from 'react';
import { ingredientPropTypes } from '../utils/propTypes';
import PropTypes from 'prop-types';

export const IngredientContext = createContext(null);

IngredientContext.propTypes = {
    ingredients: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        isError: PropTypes.bool.isRequired,
        textError: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
        selectIngredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
        order: PropTypes.number.isRequired,
        postOrder: PropTypes.func.isRequired,
        ingredientForModal: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    }).isRequired,
    setIngredients: PropTypes.func.isRequired,
};
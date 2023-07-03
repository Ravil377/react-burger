import PropTypes from 'prop-types';

export const ingredient = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
}

export const ingredientsPropTypes = PropTypes.shape(ingredient);

export const refsPropTypes = PropTypes.shape({
    bun: PropTypes.object,
    sauce: PropTypes.object,
    main: PropTypes.object,
}).isRequired
import constructorListStyles from './constructorList.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes } from '../../../utils/propTypes';
import PropTypes from 'prop-types';

export const ConstructorList = ({ingredients}) => {
    return (
        <>
        {ingredients.map(component => 
            <div className={constructorListStyles.ingredients} key={component._id}>
                <button className={constructorListStyles.button}>
                    <DragIcon type="primary" />
                </button>
                <ConstructorElement
                    text={component.name}
                    price={component.price}
                    thumbnail={component.image}
                />
            </div>
        )}        
        </>
    )
}

ConstructorList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
};
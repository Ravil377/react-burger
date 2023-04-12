import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes } from '../../../utils/propTypes';
import PropTypes from 'prop-types';
import bunStyles from './bun.module.css';

export const Bun = ({ bun, position, positionText }) => {
    return (
        <ConstructorElement
            type={position}
            isLocked={true}
            text={bun[0].name + ' ' + positionText}
            price={bun[0].price}
            thumbnail={bun[0].image}
            extraClass={`mr-7 ${position === "bottom" ? bunStyles.bottom : ''}`}
        />        
    )
}
Bun.propTypes = {
    bun: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
    position: PropTypes.string.isRequired,
    positionText: PropTypes.string.isRequired,
};
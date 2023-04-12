import modalOverlayStyles from './modalOverlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ modalClose }) => {

    const handleOverlayClick = () => modalClose();

    return(
        <div className={`${modalOverlayStyles.overlay}`} onClick={handleOverlayClick}></div>
    );
}

ModalOverlay.propTypes = {
    modalClose: PropTypes.func.isRequired,
};
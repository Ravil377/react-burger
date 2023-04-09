import ReactDOM from 'react-dom';
import modalOverlayStyles from './modalOverlay.module.css';
import PropTypes from 'prop-types';

const modalOverlayRoot = document.getElementById("modalOverlay");

export const ModalOverlay = ({ showModal, modalClose }) => {

    const handleOverlayClick = () => modalClose();

    return ReactDOM.createPortal(
        (
            <div className={`${modalOverlayStyles.overlay} ${showModal ? modalOverlayStyles.active : ''} `} onClick={handleOverlayClick}></div>
        ), 
        modalOverlayRoot
    );
}

ModalOverlay.propTypes = {
    showModal: PropTypes.bool.isRequired,
    modalClose: PropTypes.func.isRequired,
};
import {useEffect, useCallback} from "react";
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modalOverlay/modal-overlay';

const modalRoot = document.getElementById("modal");

export const Modal = ({ showModal, modalClose, children }) => {

    const handleCloseBtnClick = () => modalClose();

    const handleClosePopupOnEsc = useCallback((e) => (e.code === "Escape") && modalClose(), [modalClose]);

    useEffect(()=> {
        modalRoot.classList.add('active');
        document.addEventListener('keyup', handleClosePopupOnEsc);

        return () => {
            modalRoot.classList.remove('active');
            document.removeEventListener('keyup', handleClosePopupOnEsc);
        }
    }, [showModal, handleClosePopupOnEsc])

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay modalClose={modalClose} />
                <div className={`${modalStyles.modal} pl-10 pr-10 pt-10 pb-15`}>
                    <button className={modalStyles.closeBtn} onClick={handleCloseBtnClick}><CloseIcon type="primary"/></button>
                    {children}
                </div>
            </>
        ), 
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    showModal: PropTypes.bool.isRequired,
    modalClose: PropTypes.func.isRequired,
};
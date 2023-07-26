import {useEffect, useCallback, FC, ReactNode} from "react";
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modalOverlay/modal-overlay';
import { REMOVE_INGREDIENT_FOR_DETAIL } from '../../services/actions/ingredient-details';
import { REMOVE_ORDER } from '../../services/actions/order';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IModalProps } from "../../utils/chema";

const modalRoot = document.getElementById("modal");

export const Modal:FC<IModalProps> = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseBtnClick = () => modalClose();

    const modalClose = useCallback(() => {
        dispatch( { type: REMOVE_INGREDIENT_FOR_DETAIL } )
        dispatch( { type: REMOVE_ORDER } )
        navigate('/');
    }, [dispatch, navigate]);
    
    const handleClosePopupOnEsc = useCallback((e:any) => (e.code === "Escape") && modalClose(), [modalClose]);

    useEffect(()=> {
        if(modalRoot) {
            modalRoot.classList.add('active');
            document.addEventListener('keyup', handleClosePopupOnEsc);
        }

        return () => {
            if(modalRoot) {
                modalRoot.classList.remove('active');
                document.removeEventListener('keyup', handleClosePopupOnEsc);
            }
        }
    }, [handleClosePopupOnEsc])

    if (!modalRoot) {
        return null;
    }

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

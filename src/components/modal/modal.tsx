import { useEffect, FC, ReactNode } from "react";
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modalOverlay/modal-overlay';
import { REMOVE_INGREDIENT_FOR_DETAIL } from '../../services/actions/ingredient-details';
import { REMOVE_ORDER } from '../../services/actions/order';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById("modal");

interface IModalProps {
    children?: ReactNode;
}

export const Modal: FC<IModalProps> = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    let state = location.state;
    const handleCloseBtnClick = () => modalClose();

    const modalClose = () => {
        dispatch({ type: REMOVE_INGREDIENT_FOR_DETAIL });
        dispatch({ type: REMOVE_ORDER });
        navigate(state ? state.backgroundLocation.pathname : '/');
    };

    useEffect(() => {
        if (modalRoot) {
            modalRoot.classList.add('active');
            const handleClosePopupOnEsc = (e: KeyboardEvent) => (e.code === "Escape") && modalClose();
            document.addEventListener('keyup', handleClosePopupOnEsc);

            return () => {
                modalRoot.classList.remove('active');
                document.removeEventListener('keyup', handleClosePopupOnEsc);
            };
        }
    }, [modalClose]);

    if (!modalRoot) {
        return null;
    }

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay modalClose={modalClose} />
                <div className={`${modalStyles.modal} pl-10 pr-10 pt-10 pb-15`}>
                    <button className={modalStyles.closeBtn} onClick={handleCloseBtnClick}><CloseIcon type="primary" /></button>
                    {children}
                </div>
            </>
        ),
        modalRoot
    );
}

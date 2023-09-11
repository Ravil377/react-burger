import { FC } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps {
    modalClose: () => void;
}

export const ModalOverlay:FC<IModalOverlayProps> = ({ modalClose }) => {

    const handleOverlayClick = () => modalClose();

    return(
        <div className={`${modalOverlayStyles.overlay}`} onClick={handleOverlayClick}></div>
    );
}

import { FC } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';
import { IModalOverlayProps } from '../../utils/chema';

export const ModalOverlay:FC<IModalOverlayProps> = ({ modalClose }) => {

    const handleOverlayClick = () => modalClose();

    return(
        <div className={`${modalOverlayStyles.overlay}`} onClick={handleOverlayClick}></div>
    );
}

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import bunStyles from './bun.module.css';
import { FC } from 'react';

interface IBunProps {
    bun: IBun[];
    position: 'bottom' | 'top' | undefined;
    positionText: string;
}

interface IBun {
    name: string;
    price: number;
    image: string;
}

export const Bun:FC<IBunProps> = ({ bun, position, positionText }) => {
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

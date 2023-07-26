import { FC } from 'react';
import tabContentStyles from './tab-content.module.css';

interface ITabContentProps {
    children: React.ReactNode;
    containerRef: React.RefObject<HTMLDivElement>;
}

export const TabContent: FC<ITabContentProps> = (props) => {
    return (
        <div className={`custom-scroll ${tabContentStyles.content}`} ref={props.containerRef}>
            {props.children}
        </div>
    );
}

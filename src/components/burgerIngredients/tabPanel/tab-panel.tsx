import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { TAB1, TAB2, TAB3 } from '../../../utils/constants';
import { FC, RefObject } from 'react';

interface ITabPanelProps {
    current: string;
    handleChangeTab: (tab: string) => void;
    refs: RefObject<HTMLDivElement>[] | null;
}

export const TabPanel: FC<ITabPanelProps> = (props) => {
    const scrollToIngredient = (refIndex: number) => props.refs?.[refIndex]?.current?.scrollIntoView({ behavior: 'smooth' });

    return (
        <div style={{ display: 'flex' }}>
            <Tab value="bun" active={props.current === 'bun'} onClick={() => { props.handleChangeTab('bun'); scrollToIngredient(0) }}>
                {TAB1}
            </Tab>
            <Tab value="sauce" active={props.current === 'sauce'} onClick={() => { props.handleChangeTab('sauce'); scrollToIngredient(1) }}>
                {TAB2}
            </Tab>
            <Tab value="main" active={props.current === 'main'} onClick={() => { props.handleChangeTab('main'); scrollToIngredient(2) }}>
                {TAB3}
            </Tab>
        </div>
    )
}


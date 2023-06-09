import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import {TAB1, TAB2, TAB3} from '../../../utils/constants';
import { refsPropTypes } from '../../../utils/prop-types';
import PropTypes from 'prop-types';

export const TabPanel = (props) => {
    const { current, handleChangeTab } = props;
    const scrollToIngredient = (refIndex) => props.refs[refIndex].current.scrollIntoView({ behavior: 'smooth' });

    return (
        <div style={{ display: 'flex' }}>
            <Tab value="bun" active={current === 'bun'} onClick={()=>{handleChangeTab('bun'); scrollToIngredient(0)}}>
                {TAB1}
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={()=>{handleChangeTab('sauce'); scrollToIngredient(1)}}>
                {TAB2}
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={()=>{handleChangeTab('main'); scrollToIngredient(2)}}>
                {TAB3}
            </Tab>
        </div>
    )
}
TabPanel.propTypes = {
    refs: PropTypes.arrayOf(refsPropTypes).isRequired,
};
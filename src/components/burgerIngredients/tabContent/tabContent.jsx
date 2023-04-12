import tabContentStyles from './tabContent.module.css';
import PropTypes from 'prop-types';

export const TabContent = (props) => {
    return (
        <div className={`custom-scroll ${tabContentStyles.content}`}>
            {props.children}
        </div>
    )
}
TabContent.propTypes = {
    children: PropTypes.node.isRequired,
};
import containerStyles from './container.module.css';
import PropTypes from 'prop-types';

function Container(props) {
    return (
        <div className={containerStyles.outer}>
            <div className={containerStyles.inner}>
                {props.children}
            </div>
        </div>
    );
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Container;
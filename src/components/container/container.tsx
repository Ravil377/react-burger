import containerStyles from './container.module.css';

interface IContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<IContainerProps> = (props) => {
    return (
        <div className={containerStyles.outer}>
            {props.children}
        </div>
    );
}


export default Container;
import { useSelector } from 'react-redux';
import { ConstructorIngredient } from '../constructor-ingredient/constructor-ingredient';

export const ConstructorList = () => {
    const { selectIngredients } = useSelector(state => ({
        selectIngredients: state.selectIngredients.selectIngredients
    }));  
    
    return (
        <>
            {selectIngredients.map((component, idx) => component.type !== "bun" &&
                <ConstructorIngredient component={component} index={idx} key={component.key}/>
            )}        
        </>
    )
}


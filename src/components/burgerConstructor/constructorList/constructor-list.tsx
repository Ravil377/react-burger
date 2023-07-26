import { useSelector } from 'react-redux';
import { ConstructorIngredient } from '../constructor-ingredient/constructor-ingredient';
import { IIngredient } from '../../../utils/chema';

export const ConstructorList = () => {
    const { selectIngredients } = useSelector(state => ({
        // @ts-ignore
        selectIngredients: state.selectIngredients.selectIngredients
    }));  
    
    return (
        <>
            {selectIngredients.map((component:IIngredient, idx:number) => component.type !== "bun" &&
                <ConstructorIngredient component={component} index={idx} key={component.key}/>
            )}        
        </>
    )
}


import { ConstructorIngredient } from '../constructor-ingredient/constructor-ingredient';
import { IIngredient, useAppSelector } from '../../../utils/chema';

export const ConstructorList = () => {
    const { selectIngredients } = useAppSelector(store => ({
        selectIngredients: store.selectIngredients.selectIngredients
    }));  
    
    return (
        <>
            {selectIngredients.map((component:IIngredient, idx:number) => component.type !== "bun" &&
                <ConstructorIngredient component={component} index={idx} key={component.key}/>
            )}        
        </>
    )
}


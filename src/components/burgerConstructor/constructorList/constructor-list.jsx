import { useContext } from 'react';
import constructorListStyles from './constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientContext } from '../../../utils/ingredient-context';

export const ConstructorList = () => {
    
    const { ingredients, setIngredients } = useContext(IngredientContext);  
    
    return (
        <>
        {ingredients.selectIngredients.map(component => component.type !== "bun" &&
            (<div className={constructorListStyles.ingredients} key={`${component._id}-${Math.random()}`}>
                <button className={constructorListStyles.button}>
                    <DragIcon type="primary" />
                </button>
                <ConstructorElement
                    text={component.name}
                    price={component.price}
                    thumbnail={component.image}
                />
            </div>)
        )}        
        </>
    )
}


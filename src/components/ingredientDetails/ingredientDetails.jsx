import { useContext } from 'react';
import ingredientDetailStyles from './ingredientDetails.module.css';
import { titleDetail, caloriesDetail, proteinDetail, fatDetail, carbohydratesDetail } from '../../utils/constants';
import { IngredientContext } from '../../utils/ingredientContext';

export const IngredientDetails = () => {
    const { ingredients, setIngredients } = useContext(IngredientContext); 
    const {image, name, calories, proteins, fat, carbohydrates} = ingredients.ingredientForModal;
    
    return (
        <>
            <div className={ingredientDetailStyles.container}>
                <h2 className={`${ingredientDetailStyles.title} text text_type_main-large`}>{titleDetail}</h2>
                <img src={image} alt={name} />
                <p className={`${ingredientDetailStyles.name} text text_type_main-medium mt-4 mb-8`}>{name}</p>
                <ul className={`${ingredientDetailStyles.list}`}>
                    <li><p className="text text_type_main-default text_color_inactive">{caloriesDetail}<span>{calories}</span></p></li>
                    <li><p className="text text_type_main-default text_color_inactive">{proteinDetail}<span>{proteins}</span></p></li>
                    <li><p className="text text_type_main-default text_color_inactive">{fatDetail}<span>{fat}</span></p></li>
                    <li><p className="text text_type_main-default text_color_inactive">{carbohydratesDetail}<span>{carbohydrates}</span></p></li>
                </ul>
            </div>
        </>
    );
}

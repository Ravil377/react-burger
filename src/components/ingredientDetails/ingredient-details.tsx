import { useParams } from 'react-router-dom';
import { filterById } from '../../utils/utils';
import { useState, useEffect } from 'react';
import ingredientDetailStyles from './ingredient-details.module.css';
import { titleDetail, caloriesDetail, proteinDetail, fatDetail, carbohydratesDetail } from '../../utils/constants';
import { IIngredient, useAppSelector } from '../../utils/chema';

export const IngredientDetails = () => {
    const ingredients = useAppSelector(store => store.ingredients.ingredients);
    const [ingredient, setIngredient] = useState<IIngredient | null>(null);
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            const extractedId = id.substring(1);
            const newIngredient = filterById(extractedId, ingredients);
            newIngredient && setIngredient(newIngredient);
        }
    }, [id, ingredients])

    if (!ingredient) {
        return <div className={ingredientDetailStyles.container}></div>;
    }

    return (
        <div className={ingredientDetailStyles.container}>
            <h2 data-testid="modalTitle" className={`${ingredientDetailStyles.title} text text_type_main-large`}>{titleDetail}</h2>
            <img src={ingredient.image} alt={ingredient.name} />
            <p className={`${ingredientDetailStyles.name} text text_type_main-medium mt-4 mb-8`}>{ingredient.name}</p>
            <ul className={`${ingredientDetailStyles.list}`}>
                <li><p className="text text_type_main-default text_color_inactive">{caloriesDetail}<span>{ingredient.calories}</span></p></li>
                <li><p className="text text_type_main-default text_color_inactive">{proteinDetail}<span>{ingredient.proteins}</span></p></li>
                <li><p className="text text_type_main-default text_color_inactive">{fatDetail}<span>{ingredient.fat}</span></p></li>
                <li><p className="text text_type_main-default text_color_inactive">{carbohydratesDetail}<span>{ingredient.carbohydrates}</span></p></li>
            </ul>
        </div>
    );
}

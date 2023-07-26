import ingredientListStyles from './ingredient-list.module.css';
import { IngredientCard } from '../ingredientCard/ingredient-card';
import { filterByType } from '../../../utils/utils';
import { useSelector } from 'react-redux';
import { FC, RefObject } from 'react';

interface IIngredient {
    _id: string;
    name: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    image: string;
    price: number;
}

interface IIngredientListProps {
    refId: number;
    type: string;
    title: string;
    refs: RefObject<HTMLHeadingElement>[];
}

export const IngredientList: FC<IIngredientListProps> = ({ refId, type, title, refs }) => {
    // @ts-ignore
    const { ingredients } = useSelector(state => state.ingredients);

    return (
        <>
            <h2 data-tab={type} className="type text text_type_main-medium pt-10" ref={refs[refId]}>{title}</h2>
            <ul className={`pl-4 pr-4 pt-6 ${ingredientListStyles.list}`} >
                {filterByType(type, ingredients).map((item: IIngredient) => ( // Use IIngredient type for the map callback
                    <IngredientCard 
                        key={item._id}
                        ingredient={item}
                    />
                ))}
            </ul>
        </>
    );
}

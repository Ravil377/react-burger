import ingredientListStyles from './ingredient-list.module.css';
import { IngredientCard } from '../ingredientCard/ingredient-card';
import { filterByType } from '../../../utils/utils';
import { FC, RefObject } from 'react';
import { IIngredient, useAppSelector } from '../../../utils/chema';

interface IIngredientListProps {
    type: string;
    title: string;
    componentRef: RefObject<HTMLHeadingElement>;
}

export const IngredientList: FC<IIngredientListProps> = ({ type, title, componentRef }) => {
    const { ingredients } = useAppSelector(store => store.ingredients);

    return (
        <>
            <h2 data-tab={type} className="type text text_type_main-medium pt-10" ref={componentRef}>{title}</h2>
            <ul className={`pl-4 pr-4 pt-6 ${ingredientListStyles.list}`} >
                {filterByType(type, ingredients).map((item: IIngredient) => (
                    <IngredientCard 
                        key={item._id}
                        ingredient={item}
                    />
                ))}
            </ul>
        </>
    );
}

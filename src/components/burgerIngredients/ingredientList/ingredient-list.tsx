import ingredientListStyles from './ingredient-list.module.css';
import { IngredientCard } from '../ingredientCard/ingredient-card';
import { filterByType } from '../../../utils/utils';
import { useSelector } from 'react-redux';
import { FC, RefObject } from 'react';
import { IIngredient } from '../../../utils/chema';

interface IIngredientListProps {
    type: string;
    title: string;
    componentRef: RefObject<HTMLHeadingElement>;
}

export const IngredientList: FC<IIngredientListProps> = ({ type, title, componentRef }) => {
    // @ts-ignore
    const { ingredients } = useSelector(state => state.ingredients);

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

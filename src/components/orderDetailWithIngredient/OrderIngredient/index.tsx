import { Link, useParams } from 'react-router-dom'
import OrderIngredientStyle from './OrderIngredient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderIngredient = () => {
    const { id } = useParams();
    const id1 = "643d69a5c3f7b9001cfa093c";
    return (
        <Link to={`/ingredients/:${id1}`} className={OrderIngredientStyle.ingredient} >
            <div className={OrderIngredientStyle.img} ><img src='#' alt="Image" /></div>
            <p className='text text_type_main-default ml-4' style={{color: "white", textDecoration: "none"}}>Флюоресцентная булка R2-D3</p>
            <p className='text text_type_main-default ml-4 mr-2' style={{color: "white", textDecoration: "none", marginLeft: "auto"}}>2 x 20</p>
            <CurrencyIcon type="primary" />
        </Link>
    )
}
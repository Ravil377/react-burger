import constructorIngredientStyles from './constructor-ingredient.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT, UPDATE_INGREDIENT_POSITION } from '../../../services/actions/burger-constructor';
import { INGREDIENT_DECREMENT } from '../../../services/actions/ingredients';
import { useDrag, useDrop } from "react-dnd";
import { useRef } from 'react'
import PropTypes from 'prop-types';
import { ingredient } from '../../../utils/prop-types';

const style = {
    cursor: 'move',
}

export const ConstructorIngredient = ({ component, index }) => {
    const dispatch = useDispatch();
    const ref = useRef(null)

    const removeIngredient = (component) => {
        dispatch({ type: REMOVE_INGREDIENT, key: component.key });
        dispatch({ type: INGREDIENT_DECREMENT, id: component._id });
    }
    
    const [{ handlerId }, drop] = useDrop({
      accept: "sortIngredient",
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover(item, monitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        dispatch({ 
            type: UPDATE_INGREDIENT_POSITION, 
            payload: { dragIndex, hoverIndex } 
        });
        item.index = hoverIndex
      }
    })
    const [{ isDragging }, drag] = useDrag({
        type: "sortIngredient",
        item: () => {
          let id = component.key;
          return { id, index }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <div className={constructorIngredientStyles.ingredients} ref={ref} data-handler-id={handlerId}> 
            <button style={{ ...style, opacity }} className={constructorIngredientStyles.button}>
                <DragIcon type="primary" />
            </button>
            <ConstructorElement
                text={component.name}
                price={component.price}
                thumbnail={component.image}
                handleClose={() => removeIngredient(component)}
            />
        </div>
    )
}

ConstructorIngredient.propTypes = {
  component: PropTypes.shape(ingredient).isRequired,
  index: PropTypes.number.isRequired
};
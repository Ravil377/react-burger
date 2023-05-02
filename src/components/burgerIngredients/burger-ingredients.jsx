import { useRef, useState, useEffect } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { TabPanel } from './tabPanel/tab-panel';
import { TabContent } from './tabContent/tab-content';
import { IngredientList } from './ingredientList/ingredient-list';

function BurgerIngredients() {
    const [current, setCurrent] = useState('bun');
    const containerRef = useRef(null);
    const refs = [
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const handleChangeTab = (el) => {
        setCurrent(el);
    }

    useEffect(() => {
      const container = containerRef.current;
      const handleScroll = () => {
        refs.forEach((ref, index) => {
          const rect = ref.current.getBoundingClientRect();
          
          if (rect.top >= 0 && rect.bottom <= container.offsetHeight) {
            setCurrent(ref.current.dataset.tab);
            return;
          }
        });
      };    
      
      container.addEventListener('scroll', handleScroll);
    
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
        <section className={burgerIngredientsStyles.ingredients}>
            <TabPanel refs={refs} current={current} handleChangeTab={handleChangeTab} />
            <TabContent containerRef={containerRef}>
                <IngredientList 
                    title={"Булки"} 
                    refs={refs}
                    type={"bun"}
                    refId={0}
                />
                <IngredientList 
                    title={"Соусы"} 
                    refs={refs} 
                    type={"sauce"}
                    refId={1}
                />
                <IngredientList 
                    title={"Начинки"} 
                    type={"main"}
                    refs={refs} 
                    refId={2}
                />
            </TabContent>
        </section>
    );
}

export default BurgerIngredients;






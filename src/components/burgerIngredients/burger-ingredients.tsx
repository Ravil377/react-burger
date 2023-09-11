import { useRef, useState, useEffect } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { TabPanel } from './tabPanel/tab-panel';
import { TabContent } from './tabContent/tab-content';
import { IngredientList } from './ingredientList/ingredient-list';

function BurgerIngredients() {
    const [current, setCurrent] = useState('bun');
    const containerRef = useRef<HTMLDivElement | null>(null);
    const refs = [
        useRef<HTMLHeadingElement | null>(null),
        useRef<HTMLHeadingElement | null>(null),
        useRef<HTMLHeadingElement | null>(null)
    ];

    const handleChangeTab = (el: string) => {
        setCurrent(el);
    }

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleScroll = () => {
        refs.forEach((ref, index) => {
          const rect = ref.current?.getBoundingClientRect();
          
          if (rect && rect.top >= 0 && rect.bottom <= container.offsetHeight) { 
            setCurrent(ref.current?.dataset.tab ?? '');
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
                    componentRef={refs[0]}
                    type={"bun"}
                />
                <IngredientList 
                    title={"Соусы"} 
                    componentRef={refs[1]} 
                    type={"sauce"}
                />
                <IngredientList 
                    title={"Начинки"} 
                    type={"main"}
                    componentRef={refs[2]} 
                />
            </TabContent>
        </section>
    );
}

export default BurgerIngredients;

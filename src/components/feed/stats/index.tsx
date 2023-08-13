import { Link } from "react-router-dom";
import statsStyle from "./stats.module.css";

export const Stats = () => {

    return (
        <div className={`${statsStyle.stats} custom-scroll`}>
            <div className={statsStyle.numbers} >
                <ul>
                    <li className="text text_type_main-medium mb-6">Готовы:</li>
                    <li className="text text_type_digits-default"><Link to="">034533</Link></li>
                    <li className="text text_type_digits-default"><Link to="">034532</Link></li>
                    <li className="text text_type_digits-default"><Link to="">034530</Link></li>
                    <li className="text text_type_digits-default"><Link to="">034527</Link></li>
                    <li className="text text_type_digits-default"><Link to="">034525</Link></li>
                </ul>
                <ul>
                    <li className="text text_type_main-medium mb-6">В работе:</li>
                    <li className="text text_type_digits-default"><Link to="">034538</Link></li>
                    <li className="text text_type_digits-default"><Link to="">034541</Link></li>
                    <li className="text text_type_digits-default"><Link to="">034542</Link></li>
                </ul>
            </div>
            <div>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className="text text_type_digits-large" style={{textShadow: "0px 4px 32px rgba(51, 51, 255, 0.50), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 0px 16px rgba(51, 51, 255, 0.25)"}}>28 752</p>
            </div>
            <div>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large" style={{textShadow: "0px 4px 32px rgba(51, 51, 255, 0.50), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 0px 16px rgba(51, 51, 255, 0.25)"}}>138</p>
            </div>
        </div>
    )
}
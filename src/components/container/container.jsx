import React from "react";
// import logo from "./../images/logo.svg";
import containerStyles from './container.module.css';

function Container(props) {
    return (
        <div className={containerStyles.outer}>
            <div className={containerStyles.inner}>
                {props.children}
            </div>
        </div>
    );
}

export default Container;
import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ onlyAuth=false, component }) => {
    const isAuthChecked = useSelector( state => state.user.isAuthCheck  );
    const user = useSelector( state => state.user.user );
    const location = useLocation();
    if(!isAuthChecked) { return null; }

    if (onlyAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRoute onlyAuth={true} component={component} />
);

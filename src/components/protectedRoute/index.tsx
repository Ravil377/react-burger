import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import React, { FC } from "react";

interface ProtectedRouteProps {
  onlyAuth?: boolean;
  component: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ onlyAuth = false, component }) => {
  // @ts-ignore
  const isAuthChecked = useSelector((state) => state.user.isAuthCheck);
  // @ts-ignore
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{component}</>;
};

export const OnlyAuth: FC<ProtectedRouteProps> = ProtectedRoute;
export const OnlyUnAuth: FC<ProtectedRouteProps> = ({ component }) => (
  <ProtectedRoute onlyAuth={true} component={component} />
);

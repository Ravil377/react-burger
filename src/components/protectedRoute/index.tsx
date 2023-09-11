import { Navigate, useLocation } from "react-router-dom";
import React, { FC } from "react";
import { useAppSelector } from "../../utils/chema";

interface ProtectedRouteProps {
  onlyAuth?: boolean;
  component: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ onlyAuth = false, component }) => {

  const isAuthChecked = useAppSelector((state) => state.user.isAuthCheck);

  const user = useAppSelector((state) => state.user.user);
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

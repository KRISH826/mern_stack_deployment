import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { JSX } from "react";
import { RootState } from "@/redux/store";

interface Props {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: Props) => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (isAuthenticated && token) {
    // If logged in, redirect to home/dashboard
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

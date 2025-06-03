import Header from "@/components/Header";
import { RootState } from "@/redux/store";
import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export const ProtectedLayout = ({ children }: Props) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  console.log("ProtectedLayout isAuthenticated:", isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <Header />
      <main className="px-6 py-4">
        {children}
      </main>
    </>
  );
};

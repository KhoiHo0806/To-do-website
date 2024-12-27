import { RootState } from "@store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: React.ReactElement }) => {
  const authData = localStorage.getItem("authData");
  const token = authData ? JSON.parse(authData).token : null;
  const user = useSelector((state: RootState) => state.user.userInfo);
  useEffect(() => {}, [user]);

  return token ? children : <Navigate to={"/"} />;
};

export default PrivateRoutes;

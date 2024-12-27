import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

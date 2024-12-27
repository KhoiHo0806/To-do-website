import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children?: React.ReactElement }) => {
  const user = useSelector((state: RootState) => state.user.userInfo);

  return user ? children : <Navigate to={"/"} />;
};

export default PrivateRoutes;

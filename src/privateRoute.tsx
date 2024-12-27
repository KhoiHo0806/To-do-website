import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: React.ReactElement }) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  return accessToken ? children : <Navigate to={"/"} />;
};

export default PrivateRoutes;

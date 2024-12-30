import { RootState } from "@store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const PrivateRoutes = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    if (!user) {
      toast("Log out successfully", {
        duration: 1000,
        className: "bg-cyan-500 text-white p-4 rounded-md shadow-lg",
      });
    }
  }, [user]);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

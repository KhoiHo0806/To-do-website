import { RootState } from "@store/store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const PrivateRoutes = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) {
      toast(t("alert.logoutText"), {
        duration: 1000,
        className: "bg-cyan-500 text-white p-4 rounded-md shadow-lg",
      });
    }
  }, [user]);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

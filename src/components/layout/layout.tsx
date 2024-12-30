import Header from "@components/shared/header";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <Outlet />
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;

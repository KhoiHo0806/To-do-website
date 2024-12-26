import Header from "@components/shared/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import Header from "@components/shared/header";


const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
        <Header/>
        <Outlet/>
    </div>
  );
};

export default Layout;
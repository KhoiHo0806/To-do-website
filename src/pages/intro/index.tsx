import "./intro.css";
import { IMG_PATHS } from "@configs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  const authData = localStorage.getItem("authData");
  const token = authData ? JSON.parse(authData).token : null;

  useEffect(() => {
    if (token) {
      navigate("/todo");
    }
  });
  return (
    <div className="flex flex-1 justify-center items-center">
      <h1 className="flex gap-2 items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-500">
        <img
          className="w-16 sm:w-32 md:w-40 lg:w-48 h-auto"
          src={IMG_PATHS.introLogo}
          alt="intro logo"
        />
        This is Khoi to do website
      </h1>
    </div>
  );
};

export default Intro;

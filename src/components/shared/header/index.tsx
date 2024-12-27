import "./header.css";
import { IMG_PATHS } from "@configs";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border border-cyan-300 shadow flex items-center justify-between px-16 lg:px-64 md:px-40 sm:px-24  ">
      <div className="flex items-center">
        <Link to="./">
          <img
            className="w-20 h-auto"
            src={IMG_PATHS.introLogo}
            alt="header logo"
          />
        </Link>

        <p>ToDo</p>
      </div>
      <Link to="./login">
        <button
          className="border-2 rounded-xl
       border-cyan-400 text-cyan-600 hover:bg-cyan-400
        hover:text-white text-2xl p-2 transition-colors duration-400"
        >
          Login
        </button>
      </Link>
    </header>
  );
};

export default Header;

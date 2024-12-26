import "./header.css";
import { IMG_PATHS } from "@configs";

const Header = () => {
  return (
    <header className="border border-cyan-300 shadow flex items-center justify-between px-16 lg:px-64 md:px-40 sm:px-24  ">
      <div className="flex items-center">
        <img
          className="w-20 h-auto"
          src={IMG_PATHS.introLogo}
          alt="header logo"
        />
        <p>ToDo</p>
      </div>

      <button
        className="border-2 rounded-xl
       border-cyan-400 text-cyan-600 hover:bg-cyan-400
        hover:text-white text-2xl p-2 transition-colors duration-400"
      >
        Login
      </button>
    </header>
  );
};

export default Header;

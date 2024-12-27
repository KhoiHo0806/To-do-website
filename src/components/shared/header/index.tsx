import "./header.css";
import { IMG_PATHS } from "@configs";
import { clearUser } from "@store/slices/userSlice";
import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const authData = localStorage.getItem("authData");
  const token = authData ? JSON.parse(authData).token : null;
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();

  const handleLogout = () => {
    const logoutData = {
      token: null,
      user: null,
    };
    localStorage.setItem("authData", JSON.stringify(logoutData));
    dispatch(clearUser());
    alert("log out successfully!");
  };

  return (
    <header className="border border-cyan-300 shadow flex items-center justify-between px-16 lg:px-64 md:px-40 sm:px-24">
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

      {token ? (
        // If token exists, show the user profile
        <div className="flex items-center space-x-4">
          <img
            src={userInfo?.image}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-xl">{userInfo?.firstName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        // If no token, show the login button
        <Link to="./login">
          <button className="border-2 rounded-xl border-cyan-400 text-cyan-600 hover:bg-cyan-400 hover:text-white text-2xl p-2 transition-colors duration-400">
            Login
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;

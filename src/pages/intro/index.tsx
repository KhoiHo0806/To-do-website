import "./intro.css"
import { IMG_PATHS } from "../../config";


const Intro = ({}) => {
  return (
    <div className="flex flex-1 justify-center items-center border border-cyan-300 ">
      <h1 className="text-4xl font-bold text-emerald-500">
        <img src={IMG_PATHS.introLogo} alt="intro logo" />This is Khoi To do website</h1>
    </div>
  );
};

export default Intro;
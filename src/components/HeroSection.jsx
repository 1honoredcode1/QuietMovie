import { assets } from "../assets/assets";

import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 
    bg-[url("assets/backgroundImage.png")] bg-cover bg-no-repeat bg-center h-screen'
    >
      <img src={assets.marvelLogo} alt="header bg" className="max-h-11 mt-20" />
      <h1 className="text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110 ">
        The Amazing Spider-Man
      </h1>
      <div className="flex items-center gap-4 text-gray-300">
        <span>Action | Sci-Fi</span>
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4.5 h-4.5" />
          2012
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="w-4.5 h-4.5" />
          2h 16m
        </div>
      </div>
      <p className="max-w-md text-gray-300">
        After Peter Parker is bitten by a genetically altered spider, he gains
        newfound, spider-like powers and ventures out to save the city from the
        machinations of a mysterious reptilian foe.
      </p>
      <button
        className="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition 
      rounded-full font-medium cursor-pointer"
        onClick={() => navigate("/movies")}
      >
        Explore Movies
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HeroSection;

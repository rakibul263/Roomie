import React from "react";
import hero from "../../assets/Hero.png";

const Hero = () => {
  return (
    <div className="relative">
      <div className="relative max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] mx-auto mt-10 rounded-4xl overflow-hidden">
        <img
          className="w-full h-auto rounded-4xl shadow-[0_10px_30px_rgba(0,0,0,0.15),0_20px_60px_rgba(0,0,0,0.10)] brightness-70"
          src={hero}
          alt="Hero"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start p-4 sm:p-6 md:p-10 lg:p-16 text-white text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Find Your <br /> Perfect Match
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5">
            Find your perfect space. Live comfortably, live happy.
          </p>
          <button className="bg-amber-400 text-black font-bold px-5 py-2 sm:px-6 sm:py-3 rounded-3xl hover:bg-amber-500 transition">
            Start Your Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

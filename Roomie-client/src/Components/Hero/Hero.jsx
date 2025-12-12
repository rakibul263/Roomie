import React, { useState } from "react";
import hero1 from "../../assets/Hero1.png";
import hero2 from "../../assets/Hero2.png";
import hero3 from "../../assets/Hero3.png";
import hero4 from "../../assets/Hero4.png";
import hero5 from "../../assets/Hero5.png";
import hero6 from "../../assets/Hero6.png";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  const images = [hero4, hero5, hero6];
  const [current, setCurrent] = useState(0);

  // Slider next
  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  // Slider prev
  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div className="relative pt-20">
      <div className="relative max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] mx-auto  rounded-4xl overflow-hidden">
        <img
          className="w-full h-auto rounded-4xl shadow-[0_10px_30px_rgba(0,0,0,0.15),0_20px_60px_rgba(0,0,0,0.10)] brightness-70"
          src={images[current]}
          alt={`Hero ${current + 1}`}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start p-4 sm:p-6 md:p-10 lg:p-16 text-white text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Find Your <br /> Perfect Match
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5">
            Find your perfect space. Live comfortably, live happy.
          </p>
          <button
            className="bg-[#CA8A5E] text-white text-xl font-bold px-5 py-2 sm:px-6 sm:py-3 rounded-3xl hover:bg-amber-500 transition"
            onClick={() => navigate("/findRoommate")}
          >
            Start Your Search
          </button>
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        >
          &#10095;
        </button>
      </div>

      <div className="max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] mx-auto mt-16 space-y-16">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-lg p-6 md:p-10">
          <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#CA8A5E] mb-3">
              Easy & Quick Search
            </h2>
            <p className="text-gray-700 mb-4">
              Find your ideal roommate or room within minutes. Filter by
              location, budget, lifestyle and more.
            </p>
            <button
              className="bg-[#CA8A5E] text-white font-semibold px-5 py-2 rounded-2xl hover:bg-[#b67952] transition"
              onClick={() => navigate("/findRoommate")}
            >
              Search Now
            </button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
            <img
              src={hero1}
              alt="Search Illustration"
              className="w-64 md:w-80"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center bg-white rounded-3xl shadow-lg p-6 md:p-10">
          <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#CA8A5E] mb-3">
              Verified Profiles
            </h2>
            <p className="text-gray-700 mb-4">
              All users are verified to ensure safety and reliability. Find
              trustworthy roommates and enjoy a hassle-free living experience.
            </p>
            <button
              className="bg-[#CA8A5E] text-white font-semibold px-5 py-2 rounded-2xl hover:bg-[#b67952] transition"
              onClick={() => navigate("/findRoommate")}
            >
              View Profiles
            </button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
            <img
              src={hero2}
              alt="Verified Illustration"
              className="w-64 md:w-80"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-lg p-6 md:p-10">
          <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#CA8A5E] mb-3">
              Comfortable Living
            </h2>
            <p className="text-gray-700 mb-4">
              Create a perfect living environment with roommates who match your
              lifestyle. Enjoy peace, comfort, and convenience all in one place.
            </p>
            <button
              className="bg-[#CA8A5E] text-white font-semibold px-5 py-2 rounded-2xl hover:bg-[#b67952] transition"
              onClick={() => navigate("/findRoommate")}
            >
              Start Living Well
            </button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
            <img
              src={hero3}
              alt="Living Illustration"
              className="w-64 md:w-80"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#CA8A5E] mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="border rounded-xl p-4 hover:shadow-md transition">
              <summary className="font-semibold cursor-pointer">
                How do I find a roommate?
              </summary>
              <p className="mt-2 text-gray-700">
                You can use our search filters by location, budget, and
                lifestyle to find the perfect match.
              </p>
            </details>

            <details className="border rounded-xl p-4 hover:shadow-md transition">
              <summary className="font-semibold cursor-pointer">
                Is my data safe?
              </summary>
              <p className="mt-2 text-gray-700">
                Yes, all user information is securely stored and only verified
                users can connect.
              </p>
            </details>

            <details className="border rounded-xl p-4 hover:shadow-md transition">
              <summary className="font-semibold cursor-pointer">
                Can I change my preferences later?
              </summary>
              <p className="mt-2 text-gray-700">
                Absolutely! You can update your profile and preferences anytime
                from your dashboard.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

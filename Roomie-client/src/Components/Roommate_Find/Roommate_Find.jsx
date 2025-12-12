import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Roommate_Find = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [gender, setGender] = useState();

  useEffect(() => {
    const fetchUserPhoto = async () => {
      if (user?.email) {
        try {
          const res = await fetch("http://localhost:3000/userInfo");
          const data = await res.json();
          const matchedUser = data.find((u) => u.email === user.email);
          if (matchedUser) {
            setGender(matchedUser.gender);
          }
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      }
    };
    fetchUserPhoto();
  }, [user]);

  const roommates = data.filter(
    (roommate) => roommate.email !== user?.email && roommate.gender === gender
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-[80%] mx-auto mt-[2%] rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#CA8A5E] flavors-regular ">
        Choose Your Roommate
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roommates.map((roommate) => (
          <div
            key={roommate._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mx-auto w-4/5 hover:shadow-2xl transition-shadow duration-300 border-r-4 border-amber-600"
          >
            <div className="h-64 overflow-hidden">
              <img
                src={roommate.photo}
                alt={roommate.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {roommate.name}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-bold">Age:</span> {roommate.age}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-bold">Gender:</span> {roommate.gender}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-bold">Location:</span> {roommate.location}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-bold">Room Type:</span>{" "}
                {roommate.roomType}
              </p>
              <p className=" mb-3 font-bold text-green-900">
                <span>Budget:</span> BDT {roommate.budget}
              </p>
            </div>

            <div className="pb-5 text-center flex justify-center gap-4">
              <button className="px-6 py-2 font-medium text-white rounded-lg shadow-md transition-all bg-[#CA8A5E] hover:bg-amber-600 hover:cursor-pointer">
                Add to List
              </button>

              <button className="px-6 py-2 font-medium text-white rounded-lg shadow-md transition-all bg-[#CA8A5E]  hover:bg-amber-600 hover:cursor-pointer">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roommate_Find;

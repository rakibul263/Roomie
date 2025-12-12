import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Roommate_Find = () => {
  const data = useLoaderData() || [];
  const { user } = useContext(AuthContext);

  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(gender);
  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    const fetchUserPhoto = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(
          "https://roomie-server-six.vercel.app/userInfo"
        );
        const users = await res.json();
        const matchedUser = users.find((u) => u.email === user.email);

        if (matchedUser) {
          setGender(matchedUser.gender);
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPhoto();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl font-semibold text-[#CA8A5E]">
        Loading Roommates...
      </div>
    );
  }

  const roommates = data.filter(
    (roommate) => roommate.email !== user?.email && roommate.gender === gender
  );

  return (
    <div className="p-6 min-h-screen max-w-[80%] mx-auto  rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#CA8A5E] flavors-regular  pt-20 ">
        Choose Your Roommate
      </h1>
      {roommates.length === 0 && (
        <p className="text-center text-xl text-gray-600">
          No roommates found based on your gender preference.
        </p>
      )}

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
              <button
                onClick={() => handleClick(roommate._id)}
                className="px-6 py-2 font-medium text-white rounded-lg shadow-md transition-all bg-[#CA8A5E]  hover:bg-amber-600 hover:cursor-pointer"
              >
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

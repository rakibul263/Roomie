import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import { MdArrowBack, MdBedroomParent } from "react-icons/md";
import { GiLifeBar } from "react-icons/gi";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const Details = () => {
  const { isDisabled, setIsDisabled, user } = useContext(AuthContext);
  const data = useLoaderData();
  const navigate = useNavigate();
  const userEmail = user.email;

  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const {
    name,
    age,
    gender,
    location,
    lifestyle,
    about,
    budget,
    facebook,
    whatsapp,
    photo,
    email,
    roomType,
  } = data;

  useEffect(() => {
    const checkIfAdded = async () => {
      try {
        const res = await fetch("https://roomie-server-six.vercel.app/mylist");
        const list = await res.json();
        const match = list.find((item) => item.email === user.email);
        if (match) {
          setAlreadyAdded(true);
          setIsDisabled(true);
        }
      } catch (err) {
        console.error("Error checking list:", err);
      }
    };
    checkIfAdded();
  }, [email, setIsDisabled]);

  const handleList = async () => {
    setIsDisabled(true);
    const Info = {
      userEmail,
      name,
      age,
      gender,
      location,
      lifestyle,
      about,
      budget,
      facebook,
      whatsapp,
      photo,
      email,
      roomType,
    };

    try {
      const res = await fetch("https://roomie-server-six.vercel.app/mylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Info),
      });
      const result = await res.json();

      if (result.insertedId) {
        Swal.fire({
          title: "Added Successful!",
          icon: "success",
        }).then(() => {
          navigate("/mylist");
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Failed to add!",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 pt-20">
      <div className="w-full max-w-3xl bg-white p-6 sm:p-8 shadow-xl rounded-2xl relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 flex items-center gap-2 bg-[#CA8A5E] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-[#b67952] transition text-sm sm:text-base"
        >
          <MdArrowBack size={18} /> Back
        </button>
        <div className="flex flex-col items-center mt-10 sm:mt-12 text-center">
          <img
            src={photo}
            alt={name}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover shadow-md border-4 border-[#CA8A5E]"
          />
          <h3 className="text-2xl font-semibold mt-4">{name}</h3>
          <p className="text-gray-600 text-sm sm:text-base">{email}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5">
          <div className="flex items-center gap-3 text-gray-800">
            <FaUser className="text-[#CA8A5E] text-xl" />
            <p>
              <strong>Age:</strong> {age}
            </p>
          </div>

          <div className="flex items-center gap-3 text-gray-800">
            <FaUser className="text-[#CA8A5E] text-xl" />
            <p>
              <strong>Gender:</strong> {gender}
            </p>
          </div>

          <div className="flex items-center gap-3 text-gray-800">
            <FaMapMarkerAlt className="text-[#CA8A5E] text-xl" />
            <p>
              <strong>Location:</strong> {location}
            </p>
          </div>

          <div className="flex items-center gap-3 text-gray-800">
            <FaMoneyBillWave className="text-[#CA8A5E] text-xl" />
            <p>
              <strong>Budget:</strong> {budget} BDT
            </p>
          </div>

          <div className="flex items-center gap-3 text-gray-800">
            <MdBedroomParent className="text-[#CA8A5E] text-2xl" />
            <p>
              <strong>Room Type:</strong> {roomType}
            </p>
          </div>

          <div className="flex items-start gap-3 text-gray-800">
            <GiLifeBar className="text-[#CA8A5E] text-2xl" />
            <p>
              <strong>Lifestyle:</strong> {lifestyle}
            </p>
          </div>

          <div className="text-gray-800">
            <p className="font-semibold text-[#CA8A5E] mb-1">About:</p>
            <p>{about}</p>
          </div>

          <div className="flex items-center gap-3 text-gray-800">
            <FaFacebook className="text-[#1877F2] text-xl" />
            <a
              href={facebook}
              target="_blank"
              className="text-blue-600 underline"
            >
              Facebook Profile
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-800">
            <FaWhatsapp className="text-green-600 text-xl" />
            <p>{whatsapp}</p>
          </div>
        </div>

        {/* ADD TO LIST BUTTON */}
        <button
          disabled={isDisabled || alreadyAdded}
          onClick={handleList}
          className={`w-full mt-8 ${
            isDisabled || alreadyAdded
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#CA8A5E] hover:bg-[#b67952]"
          } text-white py-3 rounded-xl text-lg font-semibold shadow transition`}
        >
          {alreadyAdded ? "Already Added" : "Add To List"}
        </button>
      </div>
    </div>
  );
};

export default Details;

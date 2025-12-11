import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Join_As_Roommate = () => {
  const { user } = useContext(AuthContext);
  const [mate, setMate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPhoto = async () => {
      if (user?.email) {
        try {
          const res = await fetch("http://localhost:3000/userInfo");
          const data = await res.json();
          const matchedUser = data.find((u) => u.email === user.email);
          if (matchedUser) {
            setMate(matchedUser);
          }
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      }
    };
    fetchUserPhoto();
  }, [user]);

  const { name, photo, age, email, gender, location, budget, lifestyle } = mate;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Include email from user context
    data.email = email;

    try {
      const res = await fetch("http://localhost:3000/roommate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.insertedId) {
        Swal.fire({
          title: "Congratulations! You Successfully Joined as a Roommate!",
          icon: "success",
        }).then(() => navigate("/"));
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to join as a roommate",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#CA8A5E] flavors-regular">
          Join As a Roommate
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              placeholder="Enter your name"
              defaultValue={name}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              defaultValue={email}
              disabled
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              defaultValue={photo}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              defaultValue={age}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              defaultValue={gender}
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Preferred Location
            </label>
            <input
              type="text"
              name="location"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              defaultValue={location}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Monthly Budget (BDT)
            </label>
            <input
              type="number"
              name="budget"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              defaultValue={budget}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Lifestyle Preferences
            </label>
            <textarea
              name="lifestyle"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              rows="3"
              defaultValue={lifestyle}
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              About Yourself
            </label>
            <textarea
              name="about"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              rows="3"
              placeholder="Write something about yourself"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Facebook Account URL
            </label>
            <input
              type="text"
              name="facebook"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              defaultValue="https://www.facebook.com/"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Whatsapp Number
            </label>
            <input
              type="text"
              name="whatsapp"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              defaultValue="wa.me/+880"
              required
            />
          </div>

          <button className="w-full bg-[#CA8A5E] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#b67952] transition shadow-lg">
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join_As_Roommate;

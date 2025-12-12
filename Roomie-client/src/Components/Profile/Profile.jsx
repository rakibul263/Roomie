import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const Profile = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);

  const res = data.find((item) => item.email === user.email);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(res || {});

  if (!res)
    return (
      <p className="text-gray-500 text-center mt-10">
        No profile found for this user.
      </p>
    );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!res?._id) {
      Swal.fire({
        title: "Error!",
        text: "Invalid user ID",
        icon: "error",
        confirmButtonColor: "#CA8A5E",
      });
      return;
    }

    try {
      const { _id, email, ...dataToUpdate } = formData;

      const response = await fetch(
        `http://localhost:3000/roommate/${res._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToUpdate),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setEditMode(false);
        Swal.fire({
          title: "Success!",
          text: result.message || "Profile updated successfully",
          icon: "success",
          confirmButtonColor: "#CA8A5E",
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: result.message || "Failed to update profile",
          icon: "error",
          confirmButtonColor: "#CA8A5E",
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Try again later.",
        icon: "error",
        confirmButtonColor: "#CA8A5E",
      });
    }
  };

  return (
    <div className="min-h-screen  flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-8 border-t-4 border-[#CA8A5E]">
        <div className="relative w-40 h-40 mx-auto mb-6">
          <img
            src={formData.photo}
            alt={formData.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-[#CA8A5E]"
          />
        </div>

        {editMode ? (
          <>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="Photo URL"
              className="w-full p-3 mb-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] outline-none"
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 mb-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] outline-none"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-3 mb-3 border border-gray-300 rounded-xl bg-gray-100"
            />
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              placeholder="Age"
              className="w-full p-3 mb-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] outline-none"
            />
            <input
              type="text"
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              placeholder="Gender"
              className="w-full p-3 mb-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] outline-none"
            />
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-3 mb-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] outline-none"
            />
            <input
              type="number"
              name="budget"
              value={formData.budget || ""}
              onChange={handleChange}
              placeholder="Budget (BDT)"
              className="w-full p-3 mb-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] outline-none"
            />
            <input
              type="text"
              name="lifestyle"
              value={formData.lifestyle || ""}
              onChange={handleChange}
              placeholder="Lifestyle Preferences"
              className="w-full p-3 mb-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] outline-none"
            />
            <textarea
              name="about"
              value={formData.about || ""}
              onChange={handleChange}
              placeholder="About Yourself"
              className="w-full p-3 mb-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] outline-none"
              rows={3}
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#CA8A5E] hover:bg-[#b67952] text-white px-5 py-2 rounded-xl transition"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-2 text-[#CA8A5E]">
              {formData.name}
            </h2>
            <p className="text-gray-600 mb-2 ">
              <span className="font-bold">Email:</span> {formData.email}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Age:</span> {formData.age}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Gender:</span> {formData.gender}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Location:</span> {formData.location}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Budget:</span> {formData.budget} BDT
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Lifestyle:</span> {formData.lifestyle}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-bold">About:</span> {formData.about}
            </p>

            <button
              onClick={() => setEditMode(true)}
              className="bg-[#CA8A5E] hover:bg-[#b67952] text-white px-6 py-2 rounded-xl transition shadow-lg text-center items-center mx-auto flex"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

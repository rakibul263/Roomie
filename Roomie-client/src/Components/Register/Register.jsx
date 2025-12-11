import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const { email, password, ...restFormData } = Object.fromEntries(
      formData.entries()
    );

    createUser(email, password)
      .then((result) => {
        const userProfile = {
          email,
          ...restFormData,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        fetch("http://localhost:3000/userInfo", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                title: "SignUp Successful!",
                icon: "success",
              }).then(() => {
                navigate("/");
              });
            }
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This email is already in use!",
          footer:
            '<a href="/login" class="text-green-500 underline">Please Login</a>',
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
        <h2 className="text-3xl font-bold text-center mb-8 tracking-wide flavors-regular text-[#CA8A5E]">
          Roommate Finder – Registration
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
              placeholder="Enter your email address"
              required
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
              placeholder="Enter your Photo URL"
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
              placeholder="Your age"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
            >
              <option>Select Gender</option>
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
              placeholder="Area you want to live in"
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
              placeholder="Your budget"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              placeholder="Enter your password"
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
              placeholder="Write about your lifestyle, habits, etc."
            ></textarea>
          </div>

          <button
            className="w-full bg-[#CA8A5E] text-white py-3 rounded-xl font-semibold text-lg
            hover:bg-[#b67952] transition shadow-lg"
          >
            Submit
          </button>

          <p className="text-center pt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-[#CA8A5E] hover:underline">
              Please Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

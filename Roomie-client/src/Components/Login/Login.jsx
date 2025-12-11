import React, { useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const { loginUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData.entries());

    loginUser(email, password)
      .then((result) => {
        setUser(result.user);
        if (result.user) {
          Swal.fire({
            title: "Login Successful!",
            icon: "success",
          }).then(() => {
            navigate("/");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid email or password!",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong!",
        });
      });
  };

  return (
    <div className="md:mt-[9%] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
        <h2 className="text-3xl font-bold text-center mb-8 tracking-wide flavors-regular text-[#CA8A5E]">
          Login Your Account
        </h2>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button className="w-full bg-[#CA8A5E] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#b67952] transition shadow-lg">
            Login
          </button>

          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-[#CA8A5E] font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from "react";

const Login = () => {
  return (
    <div className="md:mt-[9%] flex items-center justify-center  p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
        <h2 className="text-3xl font-bold text-center mb-8 tracking-wide flavors-regular text-[#CA8A5E] ">
          Signup Your Account
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CA8A5E] focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-[#CA8A5E] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#b67952] transition shadow-lg">
            Login
          </button>

          {/* Register Link */}
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

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../../assets/footer_logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#2E3338] text-gray-300 py-12 mt-20 bottom-0">
      <div className="max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} className="h-10" alt="Roomie Logo" />
          </div>

          <p className="text-sm leading-6 opacity-70">
            Find your perfect space. <br />
            Live comfortably, live happy.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contact Details</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-white font-semibold mb-3">Terms & Conditions</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="flex items-center gap-6 justify-start md:justify-end">
          <a href="#" className="hover:text-white text-xl transition">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white text-xl transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white text-xl transition">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

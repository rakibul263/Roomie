import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import logo from "../../assets/roomie.png";
import "./Navbar.css";
import { AuthContext } from "../../Context/AuthContext";
import { useState, useEffect } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, userSignOut } = useContext(AuthContext);
  const [photoUrl, setPhotoUrl] = useState("");

  const handleAuth = () => {
    if (user) {
      userSignOut();
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserPhoto = async () => {
      if (user?.email) {
        try {
          const res = await fetch("http://localhost:3000/userInfo");
          const data = await res.json();
          const matchedUser = data.find((u) => u.email === user.email);
          if (matchedUser) {
            setPhotoUrl(matchedUser.photo);
          }
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      }
    };
    fetchUserPhoto();
  }, [user]);

  const links = (
    <>
      <li>
        <NavLink to="/" className="nav-item">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/findRoommate" className="nav-item">
          Find Roommate
        </NavLink>
      </li>
      <li>
        <NavLink to="/joinAsRoommate" className="nav-item">
          Join As Roommate
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/mylist" className="nav-item">
            My Listing
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm max-w-[80%] mx-auto fixed top-0 left-1/2 transform -translate-x-1/2 z-50 rounded-b-3xl border-b-3 border-[#CA8A5E]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <img className="h-10 items-center" src={logo} alt="" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            {user && (
              <div className="relative group">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="User Avatar" src={photoUrl} />
                  </div>
                </div>

                <div className="z-20 absolute left-1/2 transform -translate-x-1/2 -bottom-16 bg-gray-800 text-white text-sm px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  <p className="text-xs">{user.email}</p>
                </div>
              </div>
            )}

            {user && (
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a onClick={handleAuth}>Logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
        {user ? (
          " "
        ) : (
          <button
            className="btn mx-5 bg-[#CA8A5E] text-white rounded-2xl"
            onClick={handleLogin}
          >
            {/* {user ? `SignOut` : `Login`} */}
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

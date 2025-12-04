import React from "react";
import { NavLink } from "react-router";
import logo from "../../assets/roomie.png";
import "./Navbar.css";
import img from "../../assets/img.png";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/" className="nav-item">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/ab" className="nav-item">
          Find Roommate
        </NavLink>
      </li>
      <li>
        <NavLink to="/browse-listing" className="nav-item">
          Browse Listing
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-listing" className="nav-item">
          My Listing
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm max-w-[80%] mx-auto">
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
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={img} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <button className="btn mx-5 bg-[#CA8A5E] text-white rounded-2xl">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Home, Zap, Award, User, LogIn, Menu } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoSrc = "/csa.png";
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="navbar bg-gray-950/50 border-b-2 border-red-700/55 rounded-b-4xl shadow-xl z-50 sticky top-1 backdrop-blur-sm">
      <div className="navbar-start flex items-center">
        <img
          src={logoSrc}
          alt="CTF Platform Logo"
          className="w-12 h-12 mr-3 ml-3 rounded-full border object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/40x40/B91C1C/FFFFFF?text=CTF";
          }}
        />

        <button
          className="btn btn-ghost lg:hidden text-red-700"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-base font-orbi font-black tracking-widest flex items-center gap-1 ${
                  isActive ? "text-primary" : "text-red-700 hover:text-primary"
                }`
              }
            >
              <Home className="w-5 h-5" />
              Root
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/challenges"
              className={({ isActive }) =>
                `text-base font-orbi font-black tracking-widest flex items-center gap-1 ${
                  isActive ? "text-primary" : "text-red-700 hover:text-primary"
                }`
              }
            >
              <Zap className="w-5 h-5" />
              Challenges
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `text-base font-orbi font-black tracking-widest flex items-center gap-1 ${
                  isActive ? "text-primary" : "text-red-700 hover:text-primary"
                }`
              }
            >
              <Award className="w-5 h-5" />
              Leaderboard
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        <Link
          to="/login"
          className="btn bg-gray-950/50 border  border-red-800/40 font-orbi tracking-widest text-red-700  hover:text-red-300 hover:border-red-600 transition duration-200 hidden md:inline-flex mr-4"
        >
          <LogIn className="w-5 h-5" />
          Login
        </Link>
        <Link
          to="/register"
          className="btn bg-gray-950/50 border border-red-800/40 btn-sm lg:btn-md  font-orbi tracking-widest text-red-700  hover:text-red-300 hover:border-red-600  transition duration-200 hidden md:inline-flex mr-4"
        >
          <User className="w-3 h-5" />
          Register
        </Link>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 w-full bg-gray-950/95 p-4 flex flex-col items-start gap-3 lg:hidden rounded-b-3xl border-t border-red-700/55 shadow-md"
        >
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-red-700 font-orbi font-black tracking-widest hover:text-primary flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Root
          </NavLink>
          <NavLink
            to="/challenges"
            onClick={() => setIsMenuOpen(false)}
            className="text-red-700 font-orbi font-black tracking-widest hover:text-primary flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Challenges
          </NavLink>
          <NavLink
            to="/leaderboard"
            onClick={() => setIsMenuOpen(false)}
            className="text-red-700 font-orbi font-black tracking-widest hover:text-primary flex items-center gap-2"
          >
            <Award className="w-5 h-5" />
            Leaderboard
          </NavLink>

          {/* Auth Buttons for Mobile */}
          <div className="mt-3 flex gap-2 w-full">
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="btn flex-1 bg-gray-900 text-red-700 border-none hover:text-primary"
            >
              <LogIn className="w-5 h-5" />
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="btn flex-1 bg-gray-900 text-red-700 border-none hover:text-primary"
            >
              <User className="w-3 h-5" />
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

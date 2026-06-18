import React from "react";
import { Link } from "react-router-dom";

const GithubIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3-1 6-3 6-3.5.5-1 1-2 1-2.5 0-.5-.5-1-1-1.5 0-.5-.5-1-1-1.5 0 0-1.5-.5-3.5 1s-4.5 3-4.5 3c-1.5 0-3-1.5-3-3s-1.5-3-3-3-3-3-3-3-1 1.5-1 1.5c-1 1-.5 1.5 0 2 0 .5.5 1 1 1.5 0 0 1.5 1 3.5 1.5s4 1.5 4 1.5v4" />
    <path d="M9 18c-1.5 0-3-.5-4.5-1.5s-2-2-2.5-3.5-1-3-1-4.5c0-1.5.5-3 1.5-4.5s2.5-2.5 4-3c1.5-.5 3-.5 4.5 0s3 1 4 2 1.5 2.5 1.5 4c0 1.5-.5 3-1.5 4.5s-2 2.5-3.5 3c-1.5 0-3 .5-4.5 1.5z" />
    <path d="M12 18v-4" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 0-6 6v7H6v-7a6 6 0 0 1 6-6h4zM4 21V9h4v12H4zM6 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="p-10 mt-20 bg-gray-950/50 text-white border-t border-red-700/55 grid grid-cols-2 md:grid-cols-4 gap-8 mx-auto max-w-7xl">
      <aside className="col-span-2 md:col-span-1">
        <div className="flex items-center mb-4 ">
          <img
            src="/csa.png"
            alt="CTF Platform Logo"
            className="w-10 h-10 mr-3 rounded-full border object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/40x40/B91C1C/FFFFFF?text=CTF";
            }}
          />
          <p className="text-2xl font-extrabold font-orbi tracking-wider">
            <span className="text-red-500">CTF</span>_V2.O
          </p>
        </div>
        <p className="opacity-70 text-sm font-orbi tracking-widest">
          Cyber Security Alliance.
        </p>
        <p className="text-xs mt-4 opacity-50 font-orbi tracking-widest ">
          &copy; 2025 CSA JUIT. All rights reserved.
        </p>
      </aside>

      <nav className="flex flex-col space-y-2">
        <h6 className="footer-title text-red-500 font-bold font-orbi tracking-widest">
          Quick Links
        </h6>
        <Link
          className="link link-hover text-gray-400 tracking-widest font-orbi hover:text-red-500 transition-colors"
          to="/"
        >
          Root (Home)
        </Link>
        <Link
          className="link link-hover text-gray-400 tracking-widest font-orbi hover:text-red-500 transition-colors"
          to="/challenges"
        >
          Challenges
        </Link>
        <Link
          className="link link-hover text-gray-400 font-orbi tracking-widest hover:text-red-500 transition-colors"
          to="/leaderboard"
        >
          Scoreboard
        </Link>
        <Link
          className="link link-hover text-gray-400 font-orbi tracking-widest hover:text-red-500 transition-colors"
          to="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="link link-hover text-gray-400 font-orbi tracking-widest hover:text-red-500 transition-colors"
          to="/letsysopcookhere"
        ></Link>
        {/* <Link
          className="link link-hover text-gray-400 font-orbi tracking-widest hover:text-red-500 transition-colors"
          to="/dev"
        >
          About_dev
        </Link> */}
      </nav>

      <nav className="flex flex-col space-y-2">
        <h6 className="footer-title text-red-500 font-bold font-orbi tracking-widest">
          Connect
        </h6>

        <div className="flex flex-col gap-2">
          <a
            href="https://github.com/iamaryan11"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
            <span className="text-sm font-orbi tracking-widest">GitHub</span>
          </a>
          <a
           href="https://www.instagram.com/aryaxn_03/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M16.5 7h.01" />
            </svg>
            <span className="text-sm font-orbi tracking-widest">Instagram</span>
          </a>

           
          <a
          href="https://www.linkedin.com/in/aryan-3b4021330/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 11v5" />
              <path d="M8 8v.01" />
              <path d="M12 16v-5" />
              <path d="M16 16v-3a2 2 0 1 0 -4 0" />
              <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
            </svg>
            <span className="text-sm font-orbi tracking-widest">LinkedIn</span>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const CTABanner = () => {
  return (
    <div className="bg-gray-950/50bg-linear-to-b from-black via-black-900 to-gray-950 shadow-2xl py-16 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wider text-red-700 font-glitch italic mb-4">
          [SYSTEM ALERT] ACCESS REQUIRED
        </h2>

        <p className="text-xl opacity-80  text-gray-300 mb-8 font-orbi tracking-wider max-w-3xl mx-auto">
          The next challenge awaits. Do you have the access level to decrypt the
          flag? Register your agent profile now and begin the probe.
        </p>

        <Link
          to="/register"
          className="btn btn-lg btn-warning border border-red-800/40 text-red-600 tracking-widest font-extrabold shadow-lg hover:shadow-red-500/80 transition-all duration-300 transform hover:scale-[1.02] font-orbi"
          // onClick={() => console.log('CTA Banner Clicked: Navigate to Registration')}
        >
          INITIATE REGISTRATION
        </Link>
      </div>
    </div>
  );
};

export default CTABanner;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { adminRegister, clearAdminRegisterMessage } from "../authSlice";

const AdminRegisterPage = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    email_id: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState(null);

  const { loading, error, adminRegisterMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearAdminRegisterMessage());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (localError) {
      setLocalError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearAdminRegisterMessage());
    setLocalError(null);

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Error: Passwords do not match.");
      return;
    }

    const { user_name, email_id, password, phone } = formData;

    if (user_name && email_id && phone && password && !loading) {
      try {
        await dispatch(
          adminRegister({ user_name, email_id, phone, password })
        ).unwrap();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        console.error("Admin registration failed:", err);
      }
    }
  };

  const isPasswordMatch = formData.password === formData.confirmPassword;

  const getAlert = () => {
    if (adminRegisterMessage) {
      return (
        <motion.div
          role="alert"
          className="alert alert-success text-sm mb-6 bg-red-700/60 border-red-500 text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{adminRegisterMessage} Redirecting...</span>
        </motion.div>
      );
    }

    if (localError) {
      return (
        <motion.div
          role="alert"
          className="alert alert-error text-sm mb-6 bg-red-700/60 border-red-500 text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{localError}</span>
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div
          role="alert"
          className="alert alert-error text-sm mb-6 bg-red-700/60 border-red-500 text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error: {error}</span>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="min-h-screen w-screen grid place-items-center p-4 bg-gray-950 text-white overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg, 
              #111827, 
              #111827 1px, 
              #030712 1px, 
              #030712 2px
            )
          `,
        }}
      ></div>

      <motion.div
        className="card w-full max-w-lg shadow-2xl bg-gray-800/80 backdrop-blur-sm 
                   border border-red-600/50 relative z-10 transition-all duration-500 
                   hover:shadow-red-500/50"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <form className="card-body p-6 sm:p-10" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-extrabold text-red-500 mb-2 text-center tracking-widest uppercase">
            Admin Registration
          </h2>
          <p className="text-center text-sm mb-8 text-gray-400 font-mono">
            // High-Privilege Account Creation //
          </p>

          {getAlert()}

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-red-400 font-mono">
                USER_NAME:
              </span>
            </label>
            <input
              type="text"
              name="user_name"
              placeholder="Admin Name"
              className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500 border-red-600 focus:border-red-400 focus:ring-1 focus:ring-red-400 font-mono"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-red-400 font-mono">
                EMAIL_ID:
              </span>
            </label>
            <input
              type="email"
              name="email_id"
              placeholder="admin@secure.net"
              className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500 border-red-600 focus:border-red-400 focus:ring-1 focus:ring-red-400 font-mono"
              value={formData.email_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-red-400 font-mono">Phone:</span>
            </label>
            <input
              type="phone"
              name="phone"
              placeholder="0000000000"
              className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500 border-red-600 focus:border-red-400 focus:ring-1 focus:ring-red-400 font-mono"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-red-400 font-mono">
                PASSWORD:
              </span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500 border-red-600 focus:border-red-400 focus:ring-1 focus:ring-red-400 font-mono"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-red-400 font-mono">
                CONFIRM_PASSWORD:
              </span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              className={`input input-bordered w-full bg-gray-700 text-white placeholder-gray-500 font-mono 
                         ${
                           formData.confirmPassword && !isPasswordMatch
                             ? "border-red-500"
                             : "border-red-600 focus:border-red-400"
                         }`}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {!isPasswordMatch && formData.confirmPassword && (
              <p className="text-xs text-red-400 mt-2">
                Passwords do not match.
              </p>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-lg ${
                loading ? "btn-disabled" : "btn-success"
              } 
                         w-full bg-red-700 hover:bg-red-600 text-gray-900 
                         shadow-lg shadow-red-700/40 transition-all duration-300 
                         border-none font-bold tracking-widest uppercase`}
              disabled={loading || !isPasswordMatch}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner text-white"></span>
                  PROCESSING...
                </>
              ) : (
                "REGISTER ADMIN"
              )}
            </button>
          </div>

          {/* Link to Login */}
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-sm link link-hover text-red-400 hover:text-red-300 font-mono"
            >
              [ ACCESS_PANEL ] Login
            </Link>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminRegisterPage;
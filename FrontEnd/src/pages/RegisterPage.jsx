import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import the new thunk for clearing state if needed, but not strictly necessary here.
import { registerUser } from "../authSlice"; 
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader"; // Retained, though not used in the provided snippet

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    email_id: "",
    phone: "",
    password: "",
  });

  // This state is now crucial for showing the server's success message
  const [successMessage, setSuccessMessage] = useState(null);

  const { user_name, email_id, phone, password } = formData;

  // isAuthenticated is no longer relevant for the redirect after *registration*
  const { loading, error } = useSelector( 
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. REMOVE: The isAuthenticated check is removed
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // navigate('/verifyemail');
  //   }
  // }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);

    if (user_name && email_id && password && !loading) {
      try {
        // Dispatch the registration thunk
        const resultAction = await dispatch(registerUser(formData)).unwrap();
        
        // 2. CHANGE: Use the message returned from the backend (or a default one)
        setSuccessMessage(
          // Assuming backend returns { message: "..." } on success
          resultAction.message || "Registration successful. Redirecting to login Page"
        );
        
        // Redirect to the verification page after a short delay
        setTimeout(() => {
          navigate("/login", { 
            // Pass the email_id to pre-fill the verification form
            state: { email_id: formData.email_id } 
          });
        }, 1500); 

      } catch (err) {
        // Error handling is already good, just ensure a message is displayed if the error is caught here
        console.error("Registration failed:", err);
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen w-screen grid place-items-center p-6 bg-linear-to-b from-black via-zinc-900 to-red-950 text-white overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <motion.div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(
              at 50% 50%, 
              rgba(185, 28, 28, 0.5) 0%, 
              transparent 70%
            )
          `,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.3, duration: 1 }}
      ></motion.div>

      <motion.div
        className="card w-full max-w-lg shadow-2xl bg-gray-900/70 backdrop-blur-md 
                   border border-red-700/50 relative z-10 transition-all duration-500 
                   hover:shadow-red-500/50"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <form className="card-body p-6 sm:p-10" onSubmit={handleSubmit}>
          <motion.h2
            className="text-xl sm:text-3xl font-extrabold text-red-700 mb-2 text-center italic tracking-widest font-glitch"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            USER_REGISTRATION
          </motion.h2>
          <p className="text-center text-sm mb-8 text-red-500 opacity-80 font-mono">
            // INIT NEW PROFILE
          </p>

          {successMessage && !error && (
            <motion.div
              role="alert"
              className="alert alert-success text-sm mb-6 bg-green-900/40 border-green-700 text-white"
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
              <span>{successMessage}</span>
            </motion.div>
          )}

          {error && (
            <motion.div
              role="alert"
              className="alert alert-error text-sm mb-6 bg-red-900/40 border-red-700 text-white"
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
              <span>{error}</span>
            </motion.div>
          )}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {["user_name", "email_id", "phone", "password"].map(
              (field, idx) => (
                <motion.div
                  key={field}
                  className="form-control mb-4"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <label className="label">
                    <span className="label-text text-red-400 font-mono">
                      {field.toUpperCase().replace("_", " ")}:
                    </span>
                  </label>
                  <input
                    type={
                      field === "password"
                        ? "password"
                        : field === "email_id"
                        ? "email"
                        : "text"
                    }
                    name={field}
                    placeholder={
                      field === "phone"
                        ? "000-000-0000"
                        : field === "email_id"
                        ? "secure@mail.net"
                        : "********"
                    }
                    className="input input-bordered w-full bg-gray-900 text-white placeholder-gray-500 border-red-600 focus:border-red-400 focus:ring-1 focus:ring-red-400 font-mono"
                    value={formData[field]}
                    onChange={handleChange}
                    required={field !== "phone"}
                  />
                </motion.div>
              )
            )}
          </motion.div>

          <motion.div
            className="form-control mt-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <button
              type="submit"
              className={`btn btn-lg ${loading ? "btn-disabled" : "btn-error"} 
                         w-full bg-red-800 hover:bg-red-700 text-white 
                         shadow-lg shadow-red-700/40 transition-all duration-300 
                         border-none font-orbi tracking-widest`}
              disabled={loading || successMessage}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner text-red-800"></span>
                  ENCRYPTING...
                </>
              ) : (
                "CREATE_PROFILE"
              )}
            </button>
          </motion.div>

          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/login"
              className="text-sm link link-hover text-red-400 hover:text-red-300 font-mono"
            >
              [ PROFILE_EXISTS ] LOGIN_HERE
            </Link>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RegisterPage;
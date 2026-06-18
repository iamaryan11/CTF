import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";

const succesSound = "/lssuccess.mp3";
const LoginPage = () => {
  const [playSuccess] = useSound(succesSound, { volume: 1 });
  const [email_id, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ------------------------------------------------------------------
  // CRITICAL CHANGE: Handle redirect for unverified email error
  // ------------------------------------------------------------------
  useEffect(() => {
    if (isAuthenticated) {
      playSuccess();
      navigate("/dashboard");
    }

    // Check if the error is present and contains the specific unverified message
    // Your backend sends: "Please verify your email before logging in."
    // if (error && error.message && error.message.includes("verify your email")) {
    //   // Redirect the user to the verification page
    //   navigate("/verifyemail", { state: { email_id } });
    // }
  }, [isAuthenticated, navigate, error, email_id, playSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email_id && password && !loading) {
      // The error handling for unverified status occurs after the thunk fails
      dispatch(loginUser({ email_id, password }));
    }
  };

  return (
    <motion.div
      className="min-h-screen w-screen grid place-items-center p-6 bg-black text-white overflow-auto bg-linear-to-b from-black via-zinc-900 to-red-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div
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
      ></div>

      <motion.div
        className="card w-full max-w-lg shadow-2xl bg-gray-900/70 backdrop-blur-md 
                   border border-red-700/50 relative z-10 transition-all duration-500 
                   hover:shadow-red-500/50"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.form
          className="card-body p-6 sm:p-10"
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.3 },
            },
          }}
        >
          <motion.h2
            className="text-xl sm:text-3xl font-extrabold text-red-700 mb-2 text-center italic tracking-widest font-glitch"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            ACCESS_PROTOCOL
          </motion.h2>

          <motion.p
            className="text-center text-sm mb-8 text-red-500 opacity-80 font-mono"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            AUTHENTICATION REQUIRED
          </motion.p>

          {error && error.message && !error.message.includes("verify your email") && (
            <motion.div
              role="alert"
              className="alert alert-error text-sm mb-6 bg-red-900/40 border-red-700 text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
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
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 
                   11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {/* Displaying error.message or the error object itself if message is missing/unstructured */}
              <span className="wrap-break-words">{error.message || error}</span> 
            </motion.div>
          )}

          <motion.div
            className="form-control mb-4"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label className="label">
              <span className="label-text text-red-400 font-mono">
                USER@ID [EmailId]:
              </span>
            </label>
            <input
              type="email"
              placeholder="user@network.com"
              className="input input-bordered w-full bg-gray-900 text-white placeholder-gray-500 border-red-600 
                         focus:border-red-400 focus:ring-1 focus:ring-red-400 font-mono"
              value={email_id}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            className="form-control mb-6"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label className="label">
              <span className="label-text text-red-400 font-mono">
                PASSWORD:
              </span>
            </label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full bg-gray-900 text-white placeholder-gray-500 border-red-600 
                         focus:border-red-400 focus:ring-1 focus:ring-red-400 font-mono"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="label">
              {/* <Link
                to="/forgot-password"
                className="label-text-alt link link-hover text-red-500 hover:text-red-400 text-xs font-mono"
              >
                Forgot access key?
              </Link> */}
            </label>
          </motion.div>

          <motion.div
            className="form-control mt-4"
            variants={{
              hidden: { opacity: 0, y: 10, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className={`btn btn-lg ${loading ? "btn-disabled" : "btn-error"} 
                         w-full bg-red-800 hover:bg-red-700 text-white 
                         shadow-lg shadow-red-700/40 transition-all duration-300 
                         border-none font-orbi tracking-widest`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner text-red-700"></span>
                  CONNECTING...
                </>
              ) : (
                "INITIATE_LOGIN"
              )}
            </motion.button>
          </motion.div>

          <motion.div
            className="text-center mt-6"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link
              to="/register"
              className="text-sm link link-hover text-red-400 hover:text-red-300 font-mono"
            >
              [ NO_ACCOUNT ] REGISTER_NEW_USER
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
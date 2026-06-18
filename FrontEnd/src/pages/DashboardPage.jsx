import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, checkAuth } from "../authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Timer from "../components/Timer";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-linear-to-b from-black via-gray-900 to-red-950 text-white font-orbi"
    >
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="navbar bg-black/70 backdrop-blur-md border-b border-red-700/30 px-6 sticky top-0 z-50"
      >
        <div className="flex items-center justify-between w-full">
          <Timer />
          <button
            className="btn bg-gray-950/50 border border-red-800/40 rounded-md px-4 py-2 text-red-500 hover:text-red-300 hover:border-red-600 tracking-wider transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="py-16 text-center"
      >
        <p className="text-4xl font-orbi text-red-600 tracking-wide font-bold mb-4">
          Welcome, {user?.username || "Agent"}
        </p>
        <p className="text-lg tracking-widest text-gray-300">
          Ready to probe the next vulnerability?
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto px-6"
      >
        {[
          { title: "Score", value: user?.score || 0 },
          { title: "Current Question", value: user?.currentQuestion || "N/A" },
          { title: "Challenges Solved", value: user?.solved?.length || 0 },
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.03 }}
            className="card bg-gray-950/50 border border-red-700/30 shadow-lg shadow-red-900/30 rounded-xl hover:shadow-red-700/40 transition-all duration-300"
          >
            <div className="card-body text-center">
              <h3 className="text-red-500 text-xl mb-2">{stat.title}</h3>
              <p className="text-4xl font-bold text-gray-600">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.4 },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto px-6"
      >
        {[
          {
            title: "Challenges",
            desc: "Access your next cyber mission and start capturing flags.",
            btnText: "Launch",
            route: "/challenges",
          },
          {
            title: "Leaderboard",
            desc: "Track the top hackers dominating the CTF battlefield.",
            btnText: "View",
            route: "/leaderboard",
          },
          {
            title: "Protocol Docs",
            desc: "Review event rules, submission format, and general guidelines.",
            btnText: "Read",
            route: "/protocol",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.03 }}
            className="card bg-gray-950/50 border border-red-700/30 shadow-lg shadow-red-900/30 rounded-xl hover:shadow-red-700/40 transition-all duration-300"
          >
            <div className="card-body items-center text-center">
              <h3 className="text-2xl text-red-500 font-bold mb-4">
                {item.title}
              </h3>
              <p className="tracking-widest mb-4 text-gray-300">{item.desc}</p>
              <button
                className="btn bg-red-700 hover:bg-red-800 border-none text-white"
                onClick={() => navigate(item.route)}
              >
                {item.btnText}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-35"
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
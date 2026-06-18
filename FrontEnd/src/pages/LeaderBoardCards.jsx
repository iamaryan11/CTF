import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Trophy, Clock, User, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import Timer from "../components/Timer";

const LeaderBoardCards = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const fetchLeaderboard = async (isAuto = false) => {
    try {
      if (!isAuto) setLoading(true);
      else setRefreshing(true);

      const res = await axios.get("http://localhost:1111/see/leaderboard");
      if (res.data.success) setLeaderboard(res.data.leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(() => {
      fetchLeaderboard(true);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const Navbar = () => (
    <nav className="w-full bg-gray-950/80 border-b border-red-700/40 fixed top-0 left-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Timer />
        <div className="hidden md:flex space-x-6">
          <Link
            to="/leaderboard"
            className="hover:text-gray-300 font-orbi tracking-widest text-red-500"
          >
            Leaderboard
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-gray-300 font-orbi tracking-widest text-red-500"
          >
            Dashboard
          </Link>
          <Link
            to="/challenges"
            className="hover:text-gray-300 font-orbi tracking-widest text-red-500"
          >
            Challenges
          </Link>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-red-500 md:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-gray-950/90 border-t border-red-700/30 text-center py-3 space-y-3">
          <Link
            to="/leaderboard"
            onClick={() => setMenuOpen(false)}
            className="block text-red-500 hover:text-gray-300 font-orbi tracking-wider"
          >
            Leaderboard
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="block text-red-500 hover:text-gray-300 font-orbi tracking-wider"
          >
            Dashboard
          </Link>
          <Link
            to="/challenges"
            onClick={() => setMenuOpen(false)}
            className="block text-red-500 hover:text-gray-300 font-orbi tracking-wider"
          >
            Challenges
          </Link>
        </div>
      )}
    </nav>
  );

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white py-16 px-6 sm:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col items-center justify-center text-center mb-10 relative"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-red-700 font-glitch italic tracking-widest">
            LEADERBOARD
          </h1>
          <p className="text-gray-300 font-orbi mt-2 tracking-wider">
            Live updates every 10 seconds
          </p>

          <button
            onClick={() => fetchLeaderboard()}
            className={`absolute right-4 sm:right-12 top-2 p-2 rounded-full hover:bg-gray-900/50 transition-all ${
              refreshing ? "animate-spin text-red-500" : "text-red-700"
            }`}
            title="Refresh Now"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </motion.div>

        {leaderboard.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {leaderboard.map((user, index) => {
              const glowColor =
                index === 0
                  ? "shadow-yellow-400/70"
                  : index === 1
                  ? "shadow-gray-300/70"
                  : index === 2
                  ? "shadow-amber-700/60"
                  : "shadow-red-800/50";

              return (
                <motion.div
                  key={user._id}
                  className={`relative bg-gray-950/60 backdrop-blur-xl border border-red-800/60 rounded-2xl p-6 shadow-xl hover:shadow-red-700/70 transition-all duration-300 transform hover:scale-[1.03] ${glowColor}`}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute -top-3 -right-3 bg-red-700 text-white text-xs font-black px-3 py-1 rounded-full shadow-md font-orbi">
                    #{index + 1}
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <User className="w-8 h-8 text-red-600" />
                    <p className="text-lg font-orbi text-red-500 tracking-wider">
                      {user.user_name}
                    </p>
                  </div>

                  <div className="flex items-center mb-3">
                    <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                    <p className="text-lg text-gray-300 font-orbi tracking-wider">
                      Score: {user.score}
                    </p>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-2" />
                    {user.lastSolvedAt ? (
                      <span className="font-mono text-gray-300">
                        {new Date(user.lastSolvedAt).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }
                        )}
                      </span>
                    ) : (
                      <span className="italic text-gray-300">
                        solving time not punched
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      navigate("/dashboard", { state: { rank: index + 1 } })
                    }
                    className="mt-4 w-full bg-red-800 hover:bg-red-700 py-2 rounded-lg hidden text-sm font-orbi tracking-wider text-white transition-all"
                  >
                    VIEW DASHBOARD
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No agents have entered the leaderboard yet.
          </div>
        )}
      </motion.div>
    </>
  );
};

export default LeaderBoardCards;
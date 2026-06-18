import React, { useEffect, useState } from "react";
import axios from "axios";
import { Menu, X, CheckCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import Loader from "../components/Loader";
import Timer from "../components/Timer";

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await axios.get("http://localhost:1111/user/allquestions", {
          withCredentials: true,
        });
        setChallenges(res.data.questions);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const Navbar = () => (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gray-950/80 border-b border-red-700/40 fixed top-0 left-0 z-50 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Timer />

        <div className="hidden md:flex space-x-6">
          <Link
            to="/leaderboard"
            className="hover:text-gray-300 font-bold font-orbi tracking-widest text-red-500 transition duration-200"
          >
            Leaderboard
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-gray-300 font-bold font-orbi tracking-widest text-red-500 transition duration-200"
          >
            Dashboard
          </Link>
          <Link
            to="/challenges"
            className="hover:text-gray-300 font-bold font-orbi tracking-widest text-red-500 transition duration-200"
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

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-950/90 border-t border-red-700/30 text-center py-3 space-y-3"
        >
          <Link
            to="/leaderboard"
            className="block hover:text-gray-300 font-orbi tracking-wider text-red-500 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Leaderboard
          </Link>
          <Link
            to="/dashboard"
            className="block hover:text-gray-300 font-orbi tracking-wider text-red-500 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/challenges"
            className="block hover:text-gray-300 font-orbi tracking-wider text-red-500 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Challenges
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );

  if (!challenges)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-red-600 font-orbi text-2xl">
        Challenge details not found.
      </div>
    );

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-linear-to-b from-black via-gray-900 to-red-950 text-white font-orbi px-6 py-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-glitch text-red-700 italic mb-8 mt-15 text-center"
        >
          Available Challenges
        </motion.h1>

        {challenges.length === 0 ? (
          <p className="text-center text-gray-300 tracking-wider">
            No challenges available. Kindly login first to see challenges.
          </p>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {challenges.map((q) => (
              <motion.div
                key={q._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ type: "spring", stiffness: 120 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 0px 15px rgba(255,0,0,0.4)",
                }}
                className="card bg-gray-950/50 border border-red-700/40 shadow-lg shadow-red-900/30 p-2 rounded-2xl hover:border-red-500 hover:shadow-red-800/40 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/challenge/${q._id}`)}
              >

                {q.isSolved && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="absolute top-3 right-3 z-20 flex items-center space-x-1 bg-green-950 text-red-400 text-sm font-bold px-3 py-1 rounded-full shadow-lg shadow-white-700/50"
                  >
                    <CheckCircle size={15} />
                    {/* <span>Solved</span> */}
                  </motion.div>
                )}

                <div className="card-body text-center">
                  <h3 className="text-2xl text-red-500 font-semibold mb-2 tracking-widest">
                    {q.title}
                  </h3>
                  
                  <p className="text-sm text-gray-300 font-semibold tracking-widest">
                    Points: {q.points || "N/A"}
                  </p>
                  <p className="text-sm text-gray-300 font-semibold tracking-widest">
                    Difficulty: {q.level || "N/A"}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default ChallengesPage;
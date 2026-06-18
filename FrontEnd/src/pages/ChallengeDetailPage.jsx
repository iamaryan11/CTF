import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Menu, X, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import Timer from "../components/Timer";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const correctFlag = "/levelup.mp3";
const incorrectFlag = "/wrongflag.mp3";

const Navbar = ({ menuOpen, setMenuOpen }) => (
  <motion.nav
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full bg-gray-950/80 border-b  border-red-700/40 fixed top-0 left-0 z-50 backdrop-blur-md" // Thik hai
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

export default function ChallengeDetailPage() {
  const [correctFlagmusic] = useSound(correctFlag, { volume: 1 });
  const [incorrectFlagmusic] = useSound(incorrectFlag, { volume: 1 });
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hint, setHint] = useState("");

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await axios.get(`http://localhost:1111/api/${id}`, {
          withCredentials: true,
        });
        setQuestion(res.data);
      } catch (err) {
        console.error("Error fetching question:", err);
        setMessage(" Failed to load challenge. Please check your session.");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!flag.startsWith("csa_ctf{") || !flag.endsWith("}")) {
      setMessage("Flag must be in format csa_ctf{your_flag}");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:1111/api/submit-flag",
        { questionId: id, submittedFlag: flag },
        { withCredentials: true }
      );

      if (res.data.success) {
        setMessage(` ${res.data.message || "Flag submitted successfully!"}`);
        setFlag("");

        correctFlagmusic();

        if (res.data.nextQuestionId) {
          setTimeout(() => {
            navigate(`/challenge/${res.data.nextQuestionId}`);
            setMessage("");
          }, 1500);
        } else {
          // setMessage(" Congratulations! You have solved the final challenge!");
          // pass is not valid JavaScript syntax, removing or changing to a no-op statement like `// no-op`
        }
      } else {
        incorrectFlagmusic();
        setMessage(` ${res.data.message || "Incorrect flag."}`);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error("Error submitting flag:", err);
      setMessage(
        err.response?.data?.message ||
          "Server error or session expired. Please log in again."
      );
    }
  };

  const handleRequestHint = async () => {
    if (hint) return;

    const confirmDeduction = window.confirm(
      "Are u sure you want to take a hint? Points will be deducted from your score!"
    );

    if (!confirmDeduction) return;

    try {
      setMessage("Requesting the hint from President Sahab for you");

      const res = await axios.post(
        "http://localhost:1111/user/request-hint",
        { questionId: id },
        { withCredentials: true }
      );

      if (res.data.success) {
        setHint(res.data.hint);
        setMessage(`${res.data.message}`);
      } else {
        setMessage(`Error: ${res.data.message || "Failed to retrieve hint."}`);
      }
    } catch (err) {
      console.error("Error requesting hint:", err);
      setMessage(
        err.response?.data?.message || "Server error requesting hint."
      );
    }
  };

  const getMessageClass = () => {
    const msg = message.toLowerCase();
    if (msg.includes("correct") || msg.includes("success"))
      return "text-green-400";
    if (
      msg.includes("incorrect") ||
      msg.includes("failed") ||
      msg.includes("error") ||
      msg.includes("invalid")
    )
      return "text-red-400";
    return "text-yellow-400";
  };

  if (loading) return <Loader />;

  if (!question)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-red-600 font-orbi text-2xl">
        {message || "Challenge details not found."}
      </div>
    );

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <motion.div
        className="min-h-screen bg-linear-to-b from-black via-gray-900 to-red-950 text-white font-orbi flex flex-col items-center justify-center px-6 mt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="max-w-3xl w-full bg-gray-950/70 border border-red-700/40 rounded-2xl shadow-lg shadow-red-900/30 p-8 text-center hover:border-red-500 hover:shadow-red-800/40 transition-all duration-300"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-4xl font-orbi text-red-500 font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {question.title}
          </motion.h1>
          {question && (
            <motion.div
              className="mt-6 p-4 bg-gray-900/50 border border-yellow-700/40 rounded-lg text-center mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {hint ? (
                <div className="text-yellow-700 ">
                  <h3 className="flex items-center justify-center text-xl font-bold mb-2">
                    <AlertTriangle size={20} className="mr-2" />
                    Hint Taken (Points Deducted)
                  </h3>
                  <p className="whitespace-pre-wrap">Hint: {hint}</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-yellow-700 mb-3 font-semibold tracking-wide">
                    Need a hint? Score will be deducted at each request
                  </p>
                  <motion.button
                    onClick={handleRequestHint}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-700 text-gray-950 font-bold px-6 py-2 rounded-lg hover:bg-yellow-700 transition duration-200 shadow-md shadow-yellow-900/50"
                  >
                    Request Hint (Penalty: {Math.round(question.points * 0.2)}{" "}
                    pts)
                  </motion.button>
                </>
              )}
            </motion.div>
          )}
          <motion.div
            className="p-4 bg-gray-900 border border-gray-700 rounded-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap tracking-wider">
              {question.description}
            </p>
          </motion.div>

          {question.imageUrl && (
            <motion.div
              className="mb-6 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* <img
                src={question.imageUrl}
                alt="Challenge Asset"
                className="max-w-full h-auto rounded-lg shadow-xl border border-red-800/60 transition-transform duration-300 hover:scale-[1.01]"
              /> */}
              <a
                href={question.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-sm text-red-400 underline hover:text-red-300 transition-all tracking-wide"
              >
                Open Full Image in New Tab
              </a>
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <input
              type="text"
              placeholder="Enter flag in format csa_ctf{flag}"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              className="w-full max-w-md bg-gray-800 text-white placeholder-gray-500 border border-red-700/50 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-center tracking-wide"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-gray-950/50 border border-red-800/40 rounded-md px-4 py-2 text-red-500 hover:text-red-300 hover:border-red-600 tracking-wider transition duration-200"
            >
              Submit Flag
            </motion.button>
          </motion.form>

          {message && (
            <motion.p
              className={`mt-6 text-lg font-semibold ${getMessageClass()}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {message}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="mt-20 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Footer />
        </motion.div>
      </motion.div>
    </>
  );
}
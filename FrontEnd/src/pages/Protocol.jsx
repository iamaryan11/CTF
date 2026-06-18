import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { logoutUser, checkAuth } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ShieldAlert, Mail, Flag, Zap, AlertTriangle } from "lucide-react";

export default function Protocol() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  const rules = [
    {
      icon: <Mail className="w-6 h-6 text-red-500" />,
      title: "Use College Email ID [Suggested]",
      desc: "You should register using your official college email Id however, registering from different email Id is also allowed.",
    },
    {
      icon: <Flag className="w-6 h-6 text-red-500" />,
      title: "Flag Format",
      desc: "All flags must follow the format: csa_ctf{flag}. Any other format will not be accepted.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
      title: "No Sharing of Flags",
      desc: "Sharing flags or hints publicly is strictly prohibited. Violators may be disqualified.",
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: "Be Mindful while taking hints",
      desc: "Requesting the hint for same question will result in deduction of score each time so be careful.",
    },
    {
      icon: <Zap className="w-6 h-6 text-red-500" />,
      title: "Fair Play",
      desc: "Do not exploit or attack the platform itself. Only work on provided challenges.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
      title: "Respect Time Limits",
      desc: "CTF duration is fixed. Late submissions or external requests after the event ends won’t be counted.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-red-950 text-gray-200 flex flex-col items-center px-6 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-glitch italic text-red-600 mb-8 text-center tracking-wider"
      >
        CTF Protocol & Rules
      </motion.h1>

      <div className="max-w-3xl w-full space-y-6">
        {rules.map((rule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card bg-zinc-900 border border-red-700/40 shadow-lg shadow-red-900/30 p-6 rounded-2xl hover:border-red-500 hover:shadow-red-800/40 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{rule.icon}</div>
              <div>
                <h2 className="text-xl font-orbi font-semibold tracking-wider text-red-500 mb-1">
                  {rule.title}
                </h2>
                <p className="text-gray-300  font-orbi leading-relaxed tracking-widest">
                  {rule.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 text-center text-sm text-gray-400"
      >
        <p className="font-orbi tracking-wider">
          By participating, you agree to abide by all the above rules.
        </p>
        <p className="mt-1 font-orbi tracking-wider">
          Violation of any rule may result in immediate disqualification.
        </p>
      </motion.div>
    </div>
  );
}
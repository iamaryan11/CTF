import React from "react";
import { motion } from "framer-motion";

export default function AboutDev() {
  return (
    <motion.div
      className="min-h-screen bg-black bg-linear-to-b from-black via-zinc-900 to-red-950 text-white font-orbi flex flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        className="max-w-3xl w-full bg-gray-950/70 border border-red-700/40 rounded-2xl shadow-lg hover:shadow-red-700/50 transition-all duration-300 p-8 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl font-glitch text-red-600 italic mb-6 tracking-wide"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          About the Developer
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg leading-relaxed tracking-wider mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Hey! I'm Aryan, a passionate Computer Science student who loves
          building secure, scalable, and aesthetic web applications. <br />
          This CTF Platform was crafted to make ethical hacking challenges
          immersive where logic, precision, and speed decide victory.
        </motion.p>

        <motion.div
          className="p-6 bg-gray-900 border border-red-800/40 rounded-lg shadow-inner shadow-red-900/40 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <h2 className="text-2xl text-red-500 font-semibold mb-3">
            Tech Stack
          </h2>
          <ul className="text-gray-400 text-left list-disc list-inside leading-relaxed space-y-1">
            <li className="tracking-widest">
              <span className="text-red-400">Frontend:</span> React, Tailwind,
              Daisy UI
            </li>
            <li className="tracking-widest">
              <span className="text-red-400">Backend:</span> Node.js, Express.js
            </li>
            <li className="tracking-widest">
              <span className="text-red-400">Database:</span> MongoDB, Redis
            </li>
            <li className="tracking-widest">
              <span className="text-red-400">Auth:</span> JWT, 2FA
            </li>
            <li className="tracking-widest">
              <span className="text-red-400">Deployment:</span> AWS EC2
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="mt-6 border-t border-red-800/40 pt-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-xl text-red-500 font-semibold mb-3">
            Connect With Me
          </h3>
          <motion.div
            className="flex flex-col md:flex-row justify-center gap-3 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
          >
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
              </svg>
              {/* <span className="text-sm font-orbi tracking-widest">GitHub</span> */}
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M16.5 7h.01" />
              </svg>
              {/* <span className="text-sm font-orbi tracking-widest">Instagram</span> */}
            </a>
            <a
              href=" mailto:aryaneos11@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-.367.219-5.64 3.471L1 11.105V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.617zM2 11.105l4.708-2.895L1 5.383v5.722z" />
              </svg>
              {/* <span className="text-sm font-orbi tracking-widest">Twitter</span> */}
            </a>

            {/* Linkedin Link with Label (External) */}
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 11v5" />
                <path d="M8 8v.01" />
                <path d="M12 16v-5" />
                <path d="M16 16v-3a2 2 0 1 0 -4 0" />
                <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
              </svg>
              {/* <span className="text-sm font-orbi tracking-widest">LinkedIn</span> */}
            </a>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-gray-500 text-sm mt-8 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          "Every great hacker starts with curiosity — and a blank terminal."
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

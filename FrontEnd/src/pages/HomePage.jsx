// uncoent from here if error occurs

import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import CTABanner from "../components/CTABanner";
import { useNavigate } from "react-router-dom";

const hackerVideoPath = "/loading.mp4";

const HeroTextContent =
  "The digital domain is the ultimate proving ground for the mind. Master its protocols, its logic, and its shadows.";

const TypingHeroText = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < HeroTextContent.length) {
      const typingTimer = setTimeout(() => {
        setDisplayedText((prev) => prev + HeroTextContent[index]);
        setIndex((prev) => prev + 1);
      }, 50);

      return () => clearTimeout(typingTimer);
    }
  }, [index]);

  return (
    <p className="text-xl opacity-80 mb-8 font-orbi tracking-widest mt-9 text-gray-300">
      {displayedText}

      {index < HeroTextContent.length && (
        <span className="animate-pulse opacity-50 ml-1 text-gray-300">_</span>
      )}
    </p>
  );
};

const TerminalCode = `
$ scan --vulnerabilities --target 192.168.1.1
...[STATUS: Starting port scan]...
[22/tcp] SSH - Open
[80/tcp] HTTP - Open
$ attempt_injection 'juit_admin' OR 1=1 --
[ERROR] SQL injection attempt failed but csa_lads won't give up!!.
$ probe_buffer_overflow /api/v1/auth 0xxENDPOINT
[SUCCESS] Payload executed. Access granted, you're cooked!.
FLAG_OBTAINED: CTF{CYBER_DUAL_CHANNEL_LAYOUT}
`;

const TypingTerminal = () => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const lines = TerminalCode.trim().split("\n");

  useEffect(() => {
    if (isFinished) {
      const resetTimer = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setIsFinished(false);
      }, 5000);

      return () => clearTimeout(resetTimer);
    }

    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];

      if (currentCharIndex < currentLine.length) {
        const typingTimer = setTimeout(() => {
          setDisplayedLines((prevLines) => {
            const newLines = [...prevLines];
            const lastLineIndex = newLines.length - 1;

            if (
              lastLineIndex < 0 ||
              newLines[lastLineIndex].length >= currentLine.length
            ) {
              newLines.push(currentLine[currentCharIndex]);
            } else {
              newLines[lastLineIndex] += currentLine[currentCharIndex];
            }

            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, 30);

        return () => clearTimeout(typingTimer);
      } else {
        const lineBreakTimer = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);

          setDisplayedLines((prevLines) => [...prevLines, ""]);
        }, 400);

        return () => clearTimeout(lineBreakTimer);
      }
    } else {
      setIsFinished(true);
    }
  }, [currentLineIndex, currentCharIndex, lines, isFinished]);

  const isTyping = (index) =>
    index === displayedLines.length - 1 && !isFinished;

  const isTypingFinished = isFinished && currentLineIndex >= lines.length;

  return (
    <div className="relative w-full h-full rounded-lg shadow-2xl ">
      <div
        className="mockup-code w-full h-full bg-black font-mono text-red-400 overflow-hidden rounded-lg"
        style={{ maxHeight: "calc(100vh - 20rem)" }}
      >
        <div className="overflow-y-auto h-full px-4 pt-4">
          {displayedLines.map((line, index) => {
            const isCommand = line.startsWith("$");

            return (
              <pre
                key={index}
                data-prefix={isCommand ? " " : " "}
                className={
                  isCommand ? "text-red-500 font-bold" : "text-red-400"
                }
              >
                <code>{line}</code>

                {isTyping(index) && <span className="animate-pulse">_</span>}
              </pre>
            );
          })}

          {isTypingFinished && (
            <pre data-prefix=" " className="text-red-500 font-bold">
              <code>
                $ <span className="animate-pulse">_</span>
              </code>
            </pre>
          )}
        </div>
      </div>

      <div
        className="absolute inset-0 z-30 pointer-events-none rounded-lg"
        style={{
          backgroundImage: `
                        radial-gradient(
                            at center,
                            transparent 75%,
                            rgba(185, 28, 28, 0.2) 90%, 
                            black 100%
                        )
                    `,
        }}
      />
    </div>
  );
};

const categories = [
  {
    title: "Web Exploitation",
    description:
      "Uncover flaws in web applications, including XSS, SQLi, and authentication bypasses.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-red-700"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: "Reverse Engineering",
    description:
      "Analyze machine code, executables, and firmware to understand their inner workings.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-red-700"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Cryptography",
    description:
      "Break modern encryption algorithms and exploit weaknesses in hash functions and key exchange.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-red-700"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Forensics & OSINT",
    description:
      "Investigate digital artifacts, recover deleted data, and trace network activity.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-red-700"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
        <path d="M12 10v6" />
        <path d="M10 12h4" />
      </svg>
    ),
  },
];

function HomePage() {
  const navigate = useNavigate();
  const handleVideoError = () => {
    console.error(
      "Video failed to load. Ensure 'glowingred.mp4' is in your /public folder."
    );
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-black via-black-900 to-gray-950  text-white ">
        <div className="hero py-16 md:py-20 bg-black text-white relative z-30">
          <div className="hero-content text-center px-2 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl text-center sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-primary font-glitch  italic tracking-widest leading-tight">
                <span className="text-red-700">BREAKING_BUGS</span>
              </h1>

              <div className="text-base sm:text-sm md:text-xl mt-3 mb-6">
                <TypingHeroText />
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-3 sm:space-y-0">
                {/* <button
                  className="text-red-700 bg-gray-950/50 border border-red-800/40 btn btn-md sm:btn-lg btn-secondary shadow-lg hover:shadow-red-500/90 transition-all duration-300  font-orbi tracking-widest w-3/4 sm:w-auto"
                  onClick={() => navigate("/register")}
                >
                  Probe( )
                </button> */}

                <button
                  className="text-red-700 bg-gray-950/50  border-red-800/40 btn btn-md sm:btn-lg btn-secondary shadow-lg hover:shadow-red-500/90 transition-all duration-300 font-orbi tracking-widest w-3/4 sm:w-auto"
                  onClick={() => navigate("/protocol")}
                >
                  Read Protocol
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/2 h-96">
              <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl bg-black">
                <video
                  className="absolute inset-0 w-full h-full object-cover rounded-lg saturate-150"
                  src={hackerVideoPath}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onError={handleVideoError}
                >
                  Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black opacity-30 rounded-lg z-10"></div>

                <div
                  className="absolute inset-0 z-20 pointer-events-none rounded-lg"
                  style={{
                    backgroundImage: `
                                        radial-gradient(
                                            at center,
                                            transparent 65%, 
                                            black 100%
                                        )
                                    `,
                  }}
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 h-96">
              <TypingTerminal />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-extrabold text-center mb-12 italic font-glitch tracking-widest text-red-700">
            <span className="text-red-600">—</span> DOMAINS{" "}
            <span className="text-red-700">—</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="card bg-gray-950/50   border border-red-700/40 shadow-lg shadow-red-900/30 rounded-2xl hover:border-red-500 hover:shadow-red-800/40 transition-all duration-300"
              >
                <div className="card-body items-center text-center p-6">
                  <div className="mb-4">{category.icon}</div>
                  <h3 className="card-title text-xl text-red-500 font-orbi mb-2">
                    {category.title}
                  </h3>
                  <p className=" opacity-80 text-sm font-orbi text-gray-300 tracking-widest">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CTABanner />
      <Footer />
    </>
  );
}

export default HomePage;
import React, { useState, useEffect, useCallback } from "react";
import backgroundImage from "../images/laalish.png";
import "../assets/AppBackground.css";

const AppBackground = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const backgroundStyle = {
    "--mouse-x": `${position.x}px`,
    "--mouse-y": `${position.y}px`,
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div className="app-container" style={backgroundStyle}>
      <div className="content-wrapper">{children}</div>
    </div>
  );
};

export default AppBackground;

import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import AppBackground from "./components/AppBackground.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ChallengesPage from "./pages/ChallengesPage";
import ChallengeDetailPage from "./pages/ChallengeDetailPage";

import { Provider } from "react-redux";
import store from "./store/store.js";
import Protocol from "./pages/Protocol.jsx";
import LeaderBoardCards from "./pages/LeaderBoardCards.jsx";
import AdminPortal from "./pages/AdminPortal.jsx";

import AboutDev from "./pages/AboutDev.jsx";

import AdminRegisterPage from "./pages/AdminRegisterPage.jsx";

const AppContent = () => {
  const location = useLocation();
  const noNavbarPaths = [
    "/login",
    "/register",
    "/dashboard",
    "/challenges",

    "/leaderboard",
  ];
  const shouldHideNavbar = noNavbarPaths.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith("/challenge/")
  );
  return (
    <AppBackground>
      {!shouldHideNavbar && <Navbar />}

      <div data-theme="halloween" className="grow">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/challenge/:id" element={<ChallengeDetailPage />} />
          <Route path="/leaderboard" element={<LeaderBoardCards />} />

          <Route path="/letsysopcookhere" element={<AdminPortal />} />
          <Route path="/dev" element={<AboutDev />} />
          <Route path="/admincookshere" element={<AdminRegisterPage />} />
        </Routes>
      </div>
    </AppBackground>
  );
};
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
export default App;

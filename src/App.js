import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import About from "./About/About.js";
import ContactUs from "./ContactUs/ContactUs.js";
import AllHome from "./Home/AllHome";
import Login from "./Login/Login.js";
import Profile from "./Profile/Profile.js";
import ResultDisease from "./ResultDisease/ResultDisease.js";
import ResultHealth from "./ResultHealth/ResultHealth.js";
import ResultNotLettuce from "./ResultNotLettuce/ResultNotLettuce.js";
import Scanning from "./Scanning/Scanning.js";
import ScanNow from "./ScanNow/ScanNow.js";
import SignUp from "./SignUp/Signup.js";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";
  const showFooter = ["/", "/scan-now", "/about", "/contact"].includes(location.pathname);

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />

        <Route path="/" element={<ProtectedRoute><AllHome /></ProtectedRoute>} />
        <Route path="/scan-now" element={<ProtectedRoute><ScanNow /></ProtectedRoute>} />
        <Route path="/scanning" element={<ProtectedRoute><Scanning /></ProtectedRoute>} />
        <Route path="/result-health" element={<ProtectedRoute><ResultHealth /></ProtectedRoute>} />
        <Route path="/result-disease" element={<ProtectedRoute><ResultDisease /></ProtectedRoute>} />
        <Route path="/result-not-lettuce" element={<ProtectedRoute><ResultNotLettuce /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;

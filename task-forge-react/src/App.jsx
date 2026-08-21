import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/tasks" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/tasks"
          element={
            isLoggedIn ? (
              <Tasks userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/tasks" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

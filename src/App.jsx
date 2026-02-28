import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking/:id" element={<Booking />} />
          </Routes>
        </div>

        <ToastContainer />

        <footer className="footer">
          <div className="footer-content">
            <p>Телефон: +38 055 555 5555</p>
            <p>Email: goodkino@gmail.com</p>
            <p>
              Адреса: вул. Уласа Самчука, 12, Львів, Львівська область, 79000
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;

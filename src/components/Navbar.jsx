import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navibar.css";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar glass">

      <div className="logo">
        Saarthi
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div
        className={
          menuOpen
            ? "navLinks active"
            : "navLinks"
        }
      >

        <Link to="/todo">
          Todo
        </Link>

        <Link to="/pomodoro">
          Pomodoro
        </Link>

        <Link to="/planner">
          Meditation
        </Link>

        <Link to="/journal">
          Diary
        </Link>

        <Link to="/quotes">
          Motivation
        </Link>

        <Link to="/mindmate">
          AI MindMate
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;
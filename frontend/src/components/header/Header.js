import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <Link to="/adduser">Add User</Link>
        <Link to="/">Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import classess from "../pages/css/MainNavigations.module.css";

export default function MainNavigations() {
  return (
    <header className={classess.header}>
      <nav>
        <ul className={classess.list}>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

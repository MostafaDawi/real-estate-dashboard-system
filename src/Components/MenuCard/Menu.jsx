<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import "./Menu.css";
import {
  FaChartArea,
  FaCloud,
  FaFileContract,
  FaHome,
  FaLightbulb,
  FaList,
  FaPage4,
  FaPaperPlane,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { menu_paths } from "../../Functions/getPages";

function Menu({ isMinimized = false }) {
  const path = useLocation();
  const [activePage, setActivePage] = useState(null);

  function handleClick(path) {
    setActivePage(path);
  }

  useEffect(() => {
    setActivePage(path.pathname);
  }, [path]);

  return (
    <ul className={`item-list ${isMinimized ? "minimized" : ""}`}>
      {menu_paths.map((path, _idx) => (
        <Link
          to={path.path}
          key={_idx}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li
            className={`item ${isMinimized ? "minimized" : ""} ${
              activePage === path.path ? "clicked" : ""
            }`}
            aria-label={path.name}
            onClick={() => handleClick(path.path)}
          >
            <path.icon size={"20px"} className="menu-icon" />
            {!isMinimized && <span className="menu-text">{path.name}</span>}
          </li>
        </Link>
      ))}
    </ul>
=======
import React from "react";
=======
import React, { useState } from "react";
>>>>>>> 0ec06ac (5 - Added New Pages (Explore Estates, Ask AI, Contact Agent) and added their corresponding styles)
import "./Menu.css";
import {
  FaChartArea,
  FaCloud,
  FaFileContract,
  FaHome,
  FaLightbulb,
  FaList,
  FaPage4,
  FaPaperPlane,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Menu({ isMinimized = false }) {
  const [activePage, setActivePage] = useState(null);
  function handleClick(idx) {
    setActivePage(idx);
  }
  const menu_paths = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome size={"20px"} className="menu-icon" />,
    },
    {
      name: "Explore Estates",
      path: "/explore_estates",
      icon: <FaList size={"20px"} className="menu-icon" />,
    },
    {
      name: "Ask AI",
      path: "/ask_ai",
      icon: <FaCloud size={"20px"} className="menu-icon" />,
    },
    {
      name: "Contact Agent",
      path: "/contact_agent",
      icon: <FaPhoneAlt size={"20px"} className="menu-icon" />,
    },
  ];

  return (
<<<<<<< HEAD
    <div className={`item-list ${isMinimized ? "minimized" : ""}`}>
      <div className="item">
        {isMinimized ? <FaHome size={"50%"} /> : "Home"}
      </div>
      <div className="item">Explore Estates</div>
      <div className="item">Ask AI</div>
      <div className="item">Contact Agent</div>
    </div>
>>>>>>> df94a0d (1 - Created Dashboard layout and Components (Sidebar, NameCard, MenuCard))
=======
    <ul className={`item-list ${isMinimized ? "minimized" : ""}`}>
      {menu_paths.map((path, _idx) => (
        <Link
          to={path.path}
          key={_idx}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li
            className={`item ${isMinimized ? "minimized" : ""} ${
              activePage === _idx ? "clicked" : ""
            }`}
            aria-label={path.name}
            onClick={() => handleClick(_idx)}
          >
            {path.icon}
            {!isMinimized && <span className="menu-text">{path.name}</span>}
          </li>
        </Link>
      ))}
    </ul>
>>>>>>> 45d5ffb (Did some CSS modifications in the Sidebar.css)
  );
}

export default Menu;

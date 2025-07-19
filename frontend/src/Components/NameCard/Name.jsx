import React from "react";
import "./Name.css";
import titleImg from "/images/1.jpg";

function Name({ isMinimized = false }) {
  return (
    <ul className={`name ${isMinimized ? "minimized" : ""}`}>
      <li>
        <img src={titleImg} alt="avatar.png" />
      </li>
      {isMinimized ? (
        ""
      ) : (
        <li>
          <h1>Real Estate</h1>
        </li>
      )}
    </ul>
  );
}

export default Name;

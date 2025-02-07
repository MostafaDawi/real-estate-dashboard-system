import React, { useEffect, useState } from "react";
import "./Custom.css";

function Custom({ title, desc, Component, no_inflate = false, data }) {
  return (
    <div className={no_inflate ? "card-layout no-inflate" : "card-layout"}>
      <div className="card-content">
        <div className="card-title">
          <h3>{title ? title : "Title"}</h3>
          <p>{desc ? desc : "This card describes..."}</p>
        </div>
        <div className="card-main">
          <div className="component-layout">
            {Component ? (
              <Component data={data} />
            ) : (
              <img src="../src/images/2.png" alt="chart.png" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Custom;

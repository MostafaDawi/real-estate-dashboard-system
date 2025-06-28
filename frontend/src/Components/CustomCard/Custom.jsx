import React, { useEffect, useState } from "react";
import "./Custom.css";
import cardImg from "/images/2.png";

function Custom({
  title,
  desc = "",
  Component,
  no_inflate = false,
  data,
  isLoading = null,
}) {
  return (
    <div className={no_inflate ? "card-layout no-inflate" : "card-layout"}>
      <div className="card-content">
        <div className="card-title">
          <h3>{title ? title : "Title"}</h3>
          {desc && <p>{desc}</p>}
        </div>
        <div className="card-main">
          <div className="component-layout">
            {Component ? (
              <Component data={data} />
            ) : (
              <img src={cardImg} alt="chart.png" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Custom;

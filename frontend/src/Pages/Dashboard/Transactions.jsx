import React, { useState } from "react";
import "./Page_Layout.css";
import { useQuery } from "@tanstack/react-query";
import { LuLoaderCircle } from "react-icons/lu";
import "../../Components/Table/Table.css";
import Custom from "../../Components/CustomCard/Custom";
import LineChartComponent from "../../Components/LineChart/LineChartComponent";
import Table from "../../Components/Table/Table";
import { useTransaction } from "../../Functions/apiLogic";

export const Transactions = ({ isElectron = false }) => {
  const {
    data: tran,
    error: error_tran,
    isLoading: isLoading_tran,
  } = useTransaction();
  console.log(tran);

  return (
    <div
      className={`dashboard-layout ${isElectron ? "electron" : "no-electron"}`}
    >
      <div className="dashboard-content">
        <div className="title">
          <h1>Transactions</h1>
          {isLoading_tran && (
            <LuLoaderCircle className="loader center" size={25} />
          )}
          {error_tran && <p>{error_tran.message}</p>}
          {console.log(tran)}
        </div>
        <div className="section">
          <div className="dashboard-components grid-1">
            <Custom
              title={"Transactions per year"}
              desc={"Variation of transactions as the years pass"}
              Component={LineChartComponent}
              data={tran}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

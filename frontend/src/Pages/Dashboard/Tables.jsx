import React from "react";
import "./Page_Layout.css";
import Table from "../../Components/Table/Table";
import Custom from "../../Components/CustomCard/Custom";
import {
  useAllLists,
  useHotAreas,
  useProvList,
  useTransaction,
  useTypeNums,
} from "../../Functions/apiLogic";

export const Tables = ({ isElectron = false }) => {
  const {
    data: lists_type,
    error: error_type,
    isLoading: isLoading_type,
  } = useTypeNums();

  const {
    data: areas,
    error: error_areas,
    isLoading: isLoading_areas,
  } = useHotAreas();

  const {
    data: province,
    error: error_prov,
    isLoading: isLoading_prov,
  } = useProvList();

  const {
    data: all,
    error: error_all,
    isLoading: isLoading_all,
  } = useAllLists();

  const {
    data: tran,
    error: error_tran,
    isLoading: isLoading_tran,
  } = useTransaction();

  return (
    <div
      className={`dashboard-layout ${isElectron ? "electron" : "no-electron"}`}
    >
      <div className="dashboard-content">
        <div className="title">
          <h1>Tables</h1>
        </div>
        <div className="section">
          <h1>Estate Distribution Data</h1>
          <div className="dashboard-components grid-1">
            <Custom
              title="Distribution of Estate Types"
              desc="Data showing the number of listsings of each estate type."
              Component={Table}
              data={lists_type}
            />
            <Custom
              title="Province Estates"
              desc="Table of availabe estates per province."
              Component={Table}
              data={areas}
            />
            <Custom
              title="Aggregated Prices per Province"
              desc="Table of max, min, median and average prices of estates per province."
              Component={Table}
              data={province}
            />
            <Custom
              title="Hottest Estates"
              desc="Table of hottest areas with aggregated prices of estates."
              Component={Table}
              data={all}
            />
          </div>
        </div>
        <div className="section">
          <h1>Transactions:</h1>
          <div className="dashboard-components grid-1">
            <Custom
              title="Transactions (2011 - 2016)"
              desc="Table of transactions (buy and rent) done between 2011 - 2016."
              Component={Table}
              data={tran}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;

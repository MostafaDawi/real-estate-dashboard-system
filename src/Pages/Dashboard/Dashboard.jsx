import React from "react";
import "./Dashboard.css";
import Custom from "../../Components/CustomCard/Custom";
import Table from "../../Components/Table/Table";
import PieChart from "../../Components/PieChart/PieChartComponent";
import LineChartComponent from "../../Components/LineChart/LineChartComponent";

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-content">
        <div className="title">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-components">
          <Custom
            title="Sales per Month"
            desc="This line chart shows the increasing amount of sales (in $) per each month"
            Component={LineChartComponent}
          />

          <Custom
            title="Percentage of Highly Demanded Estates"
            desc="This chart represents the number of highly demanded estates according to locations"
            Component={PieChart}
          />
          <Custom />

          <Custom />
          <Custom />
        </div>
        <div className="title">
          <h1>Tables</h1>
        </div>
        <div className="dashboard-components">
          <Custom
            type="table"
            title="Table of availabe estates"
            Component={Table}
          />

          <Custom
            type="table"
            title="Table of availabe estates"
            Component={Table}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

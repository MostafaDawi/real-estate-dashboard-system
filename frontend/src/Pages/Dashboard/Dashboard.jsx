import React, { useEffect, useState } from "react";
import "./Page_Layout.css";
import Custom from "../../Components/CustomCard/Custom";
import BarChart from "../../Components/BarChart/BarChartComponent";
import MainCard from "../../Components/MainCard/MainCard";
import {
  useAggValues,
  useAllLists,
  useHotAreas,
  useProperties,
  useProvList,
  useTypeNums,
} from "../../Functions/apiLogic";
import { LuLoaderCircle } from "react-icons/lu";
import MapComponent from "../../Components/Map/MapComponent";
import PriceM2 from "../../Components/PriceM2";
import ListsByTypes from "../../Components/ListsByTypes";
import { BiLayout } from "react-icons/bi";
import ScatterComp from "../../Components/Scatter";
import LineC from "../../Components/LineC";

function Dashboard({ isElectron = false }) {
  const [gridValue, setGridValue] = useState(0);
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
    data: agg_values,
    error: error_agg,
    isLoading: isLoading_agg,
  } = useAggValues();

  console.log("Aggreggated values are: ", agg_values);

  const {
    data: areas,
    error: error_areas,
    isLoading: isLoading_areas,
  } = useHotAreas();

  const {
    data: properties,
    error: error_properties,
    isLoading: isLoading_properties,
  } = useProperties();

  const {
    data: lists_type,
    error: error_type,
    isLoading: isLoading_type,
  } = useTypeNums();

  const max_listing_count = all?.reduce(
    ([max, location], district) =>
      district.listings_count > max
        ? [district.listings_count, district.district]
        : [max, location],
    [0, ""]
  );

  const handleGridChange = () => {
    setGridValue(!gridValue);
  };

  return (
    <div
      className={`dashboard-layout ${isElectron ? "electron" : "no-electron"}`}
    >
      <div className="dashboard-content">
        <div className="title">
          <h1>Dashboard</h1>
          <button onClick={() => handleGridChange()}>
            <BiLayout />
          </button>
        </div>
        <div className="section">
          <h1>For Sale</h1>
          <div className="main-cards">
            <div className="card">
              <MainCard data={agg_values} isLoading={isLoading_agg} />
            </div>
            <div className="card">
              <MainCard
                data={agg_values}
                isLoading={isLoading_agg}
                max={true}
              />
            </div>
            <div className="card">
              <MainCard
                data={agg_values}
                isLoading={isLoading_agg}
                min={true}
              />
            </div>
            <div className="card">
              <MainCard
                data={agg_values}
                isLoading={isLoading_agg}
                tran={true}
              />
            </div>
          </div>
        </div>
        {/* FIRST ANALYSIS SCTION */}
        <div className="section">
          <h1>Prices</h1>

          <div
            className={`dashboard-components ${
              gridValue ? "grid-1" : "grid-2"
            }`}
          >
            {isLoading_prov && <LuLoaderCircle className="loader" size={30} />}
            {!isLoading_prov && (
              <Custom
                title="Prices, Areas and Price/Area in m²"
                desc={
                  "This chart represent the prices as a function of areas and the calculated price per meter square of the properties."
                }
                Component={ScatterComp}
                data={properties}
                isLoading={isLoading_prov}
              />
            )}
            {isLoading_prov && <LuLoaderCircle className="loader" size={30} />}
            {!isLoading_prov && (
              <Custom
                title="Prices/Provinces in $"
                desc={
                  "This chart represent the average, max and min prices of estates per province."
                }
                Component={BarChart}
                data={province}
                isLoading={isLoading_prov}
              />
            )}
            {console.log(province)}

            {isLoading_all && <LuLoaderCircle className="loader" size={30} />}
            {!isLoading_all && (
              <Custom
                title="Expensive Regions"
                desc={
                  "This chart represent the increase of prices per cities, showing which cities are the least and most expensive."
                }
                Component={LineC}
                data={properties}
                isLoading={isLoading_all}
              />
            )}
            {isLoading_properties && (
              <LuLoaderCircle className="loader" size={30} />
            )}
            {!isLoading_properties && (
              <Custom
                title="Prices/Squared Meter"
                desc={
                  "This chart shows the distribution of the prices per meter squared across different cities in Lebanon."
                }
                Component={PriceM2}
                data={properties}
                isLoading={isLoading_properties}
              />
            )}
            {/* {isLoading_properties && (
              <LuLoaderCircle className="loader" size={30} />
            )}
            {!isLoading_properties && (
              <Custom
                title="Prices/Squared Meter"
                desc={
                  "This chart shows the distribution of the prices per meter squared across different cities in Lebanon."
                }
                Component={Heatmap}
                data={properties}
                isLoading={isLoading_properties}
              />
            )} */}
          </div>
        </div>
        {/* SECOND ANALYSIS SECTION */}
        <div className="section">
          <h1>Stats</h1>
          <div
            className={`dashboard-components ${
              gridValue ? "grid-1" : "grid-3"
            }`}
          >
            {isLoading_type && <LuLoaderCircle className="loader" size={30} />}
            {!isLoading_type && (
              <Custom
                title="Distribution by Types"
                desc={
                  "This chart shows the distribution of the prices per meter squared across different cities in Lebanon."
                }
                Component={ListsByTypes}
                data={lists_type}
                isLoading={isLoading_type}
              />
            )}

            {isLoading_all && <LuLoaderCircle className="loader" size={30} />}
            {!isLoading_all && (
              <Custom
                title="Prices/Districts in $"
                desc={
                  "This chart represent the average, max and min prices of estates per district."
                }
                Component={BarChart}
                data={all}
                isLoading={isLoading_all}
              />
            )}
          </div>
        </div>
        <div className="section">
          <h1>Map</h1>
          <div className="dashboard-components grid-1">
            {isLoading_areas && <LuLoaderCircle className="loader" size={30} />}
            {!isLoading_areas && (
              <Custom
                title="Distribution of Listings on the Map"
                Component={MapComponent}
                data={{ areas, province }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

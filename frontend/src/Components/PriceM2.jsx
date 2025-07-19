import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const PriceM2 = ({ data, estate_specific_type = null }) => {
  const [chartData, setChartData] = useState([]);
  console.log("estate type: ", estate_specific_type);
  useEffect(() => {
    if (data) {
      setChartData(
        data?.map((prop) => ({
          city: prop?.city,
          province: prop?.province,
          price_in_m2: prop?.size_m2
            ? parseFloat((prop?.price_$ / prop?.size_m2).toFixed(2))
            : null,
          type: prop?.type,
        }))
      );
      // setChartData(
      //   properties_data?.filter(
      //     (prop) =>
      //       prop?.type?.toLowerCase().trim() ===
      //       estate_specific_type?.toLowerCase().trim()
      //   )
      // );
    }
  }, [data, estate_specific_type]);
  console.log("Estate type: ", chartData[0]?.type);

  // Calculate the max value of price_in_m2 dynamically
  const maxPriceInM2 = Math.max(
    ...chartData.map((item) => parseFloat(item.price_in_m2))
  );

  return (
    <>
      <ResponsiveContainer width={"100%"} height={420}>
        <BarChart
          style={{ fontSize: "12px" }}
          data={chartData}
          margin={{ top: 30, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <YAxis domain={[0, maxPriceInM2]} />
          <XAxis dataKey="city" />
          <Tooltip />
          <Bar
            dataKey="price_in_m2"
            fill={estate_specific_type ? estate_specific_type : "#df9902"}
          />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default PriceM2;

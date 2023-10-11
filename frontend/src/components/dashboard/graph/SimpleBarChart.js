import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { request } from "../../../utils/request";

const SimpleBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    request({ method: "GET", url: "/" })
      .then((res) => {
        const mappedData = [
          { name: "Success", value: res.successCount },
          { name: "Unique", value: res.totalUsers },
          { name: "Failure", value: res.failureCount },
        ];
        setChartData(mappedData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Analytics Data</h1>
      <BarChart width={600} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </>
  );
};

export default SimpleBarChart;

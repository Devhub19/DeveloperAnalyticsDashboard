import React from "react";

import SimpleBarChart from "./graph/SimpleBarChart";
import Table from "./table/Table";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <SimpleBarChart />
      <Table />
    </div>
  );
};

export default Dashboard;

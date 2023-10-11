import React, { useEffect, useState } from "react";

import { request } from "../../../utils/request";
import CustomDatePicker from "./customDatePicker/CustomDatePicker";
import "./Table.css";

const Table = () => {
  return (
    <>
      <h1>Table Data</h1>
      <TableHead />
    </>
  );
};

const TableHead = () => {
  const [tableData, setTableData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [timeFilter, setTimeFilter] = useState("last24hours");
  const [customRange, setCustomRange] = useState(null);

  const headColumns = [
    "User Id",
    "Timestamp",
    "Status",
    "Error message:",
    "Request Data:",
    "Response Data:",
  ];

  useEffect(() => {
    request({ method: "GET", url: "/allusers" })
      .then((res) => {
        setTableData(res);
        setFilteredData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const applyTimeFilter = (data, filter) => {
    const currentTime = new Date();
    let filteredData = [];

    switch (filter) {
      case "last24hours":
        filteredData = data?.filter((row) => {
          const rowTime = new Date(row.date);
          const timeDifference = currentTime - rowTime;
          const hoursDifference = timeDifference / (1000 * 3600);
          return hoursDifference <= 24;
        });
        break;
      case "last7days":
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentTime.getDate() - 7);
        filteredData = data?.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= sevenDaysAgo;
        });
        break;
      case "custom":
        if (customRange) {
          filteredData = data?.filter((item) => {
            const itemDate = new Date(item.date);
            return (
              itemDate >= new Date(customRange.startDate) &&
              itemDate <= new Date(customRange.endDate)
            );
          });
          console.log("custom data => ", data);
          console.log("custom filteredData => ", filteredData);
        }
        break;
      default:
        filteredData = data;
        break;
    }

    setFilteredData(filteredData);
  };

  useEffect(() => {
    applyTimeFilter(tableData, timeFilter);
  }, [customRange]);

  const handleTimeFilterChange = (event) => {
    const filter = event.target.value;
    setTimeFilter(filter);
    applyTimeFilter(tableData, filter);
  };

  const handleCustomRangeChange = (customDateRange) => {
    setCustomRange(customDateRange);
    applyTimeFilter(tableData, "custom");
  };

  return (
    <>
      <div className="filter-options">
        <label>
          Select Time Range:
          <select value={timeFilter} onChange={handleTimeFilterChange}>
            <option value="last24hours">Last 24 hours</option>
            <option value="last7days">Last 7 days</option>
            <option value="custom">Custom time range</option>
          </select>
        </label>
      </div>
      {timeFilter === "custom" && (
        <CustomDatePicker onChange={handleCustomRangeChange} />
      )}
      <div className="table-container">
        <table cclassName="centered-table">
          <thead className="table-head-row">
            <tr>
              {headColumns?.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((row) => {
              const jsonStringRequest = JSON.stringify(
                row.requestData,
                null,
                2
              );
              const jsonStringResponse = JSON.stringify(
                row.responseData,
                null,
                2
              );
              return (
                <tr className="table-data-row" key={row._id}>
                  <td>{row.userId}</td>
                  <td>{row.date}</td>
                  <td>{row.status}</td>
                  <td>{row.errorMessage}</td>
                  <td>{jsonStringRequest}</td>
                  <td>{jsonStringResponse}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;

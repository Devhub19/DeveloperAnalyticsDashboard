import React, { useState } from "react";

const CustomDatePicker = ({ onChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApplyDate = () => {
    if (startDate && endDate) {
      onChange({ startDate, endDate });
    }
  };

  return (
    <div>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleApplyDate}>Apply</button>
    </div>
  );
};

export default CustomDatePicker;

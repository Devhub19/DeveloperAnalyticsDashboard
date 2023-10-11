import React, { useState } from "react";

import { request } from "../../utils/request";
import "./AddUser.css";

const AddUser = () => {
  const [userValue, setUserValue] = useState({ userId: "" });
  const [message, setMessage] = useState(null);
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const enteredUserId = (event) => {
    if (event.target.value === "") {
      setIsTouched(true);
      return;
    }
    setIsTouched(false);
    setUserValue({ userId: event?.target?.value });
  };

  const submitHandler = (event) => {
    setIsLoading(true);
    event.preventDefault();
    request({ method: "POST", url: "/helloworld", userData: userValue?.userId })
      .then((res) => {
        setIsLoading(false);
        setMessage(res?.message);
      })
      .catch((err) => {
        setIsLoading(false);
        setMessage(err?.response?.data?.message);
      });
    setUserValue({ userId: "" });
    setMessage(null);
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <div className="form-control">
        <label htmlFor="userId">User Id:</label>
        <input
          type="text"
          id="userId"
          onChange={enteredUserId}
          value={userValue.userId}
          onBlur={enteredUserId}
        />
      </div>
      {!message && isLoading && <p className="form-errors">Sending....</p>}
      {isTouched && !isLoading && !message && (
        <p className="form-errors">Please enter the user Id</p>
      )}
      {message && <p className="form-errors">{message}</p>}

      <button className="btn" type="submit">
        Add User Id
      </button>
    </form>
  );
};

export default AddUser;

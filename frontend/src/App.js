import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";
import AddUser from "./components/addUser/AddUser";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/adduser" element={<AddUser />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

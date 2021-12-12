import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      <ToastContainer />
      <hr />
      <h1 className="text-center text-capitalize">redux crud</h1>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </>
  );
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home/Home";
import LoginPage from "./Page/Login/LoginPage";

export const Router = () => {
  return (
    <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </div>
  );
};

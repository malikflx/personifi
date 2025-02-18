import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from "./Posts/Posts";
import Login from "./Login/Login";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
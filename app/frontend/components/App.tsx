import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './Posts/Posts';
import Login from './Login/Login';
import Signup from './Signup/Signup';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

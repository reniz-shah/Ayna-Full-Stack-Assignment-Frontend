import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { getToken } from "../../auth/helper";
import Chat from "../Chat/Chat";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {

  return (
    <>
      <React.StrictMode>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={getToken() ? <Chat /> : <Navigate to="/login" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </React.StrictMode>
    </>
  )
}

export default App

import { Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "../../auth/helper";
import Chat from "../Chat/Chat";
import Login from "../Login/Login";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={getToken() ? <Chat /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App

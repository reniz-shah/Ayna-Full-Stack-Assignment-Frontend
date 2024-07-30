import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { getToken } from "../../auth/helper";
import Chat from "../Chat/Chat";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={getToken() ? <Chat /> : <Navigate to="/login" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App

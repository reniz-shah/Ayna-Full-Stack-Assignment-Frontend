import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App";
import AuthProvider from "./auth/AuthProvider";
import { HashRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
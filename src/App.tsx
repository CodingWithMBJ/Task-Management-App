import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import Home from "./pages/Home";
import Completed from "./pages/Completed";
import Important from "./pages/Important";
import DueTasks from "./pages/DueTasks";
import Login from "./components/Login";
import { useAuth0 } from "@auth0/auth0-react";
// import { useAuth } from "./context/auth-context";

const AppRoutes = () => {
  // const { isAuthenticated, isLoading } = useAuth();

  // if (isLoading) return <p>Loading...</p>;

  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading-state">
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-state">
          <div className="error-title">Oops!</div>
          <div className="error-message">Something went wrong</div>
          <div className="error-sub-message">{error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="*" element={<Login />} />
      ) : (
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/important" element={<Important />} />
          <Route path="/due" element={<DueTasks />} />
        </Route>
      )}
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

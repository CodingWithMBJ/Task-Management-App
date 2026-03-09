import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import Home from "./pages/Home";
import Completed from "./pages/Completed";
import Important from "./pages/Important";
import DueTasks from "./pages/DueTasks";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      {!token ? (
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
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

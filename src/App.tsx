import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import Home from "./pages/Home";
import Completed from "./pages/Completed";
import Important from "./pages/Important";
import DueTasks from "./pages/DueTasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/completed"} element={<Completed />}></Route>
          <Route path={"/important"} element={<Important />}></Route>
          <Route path={"/due"} element={<DueTasks />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

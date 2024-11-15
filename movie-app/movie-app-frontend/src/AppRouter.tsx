import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Randomiser from "./Randomiser";
import Navbar from "./NavBar";
import App from "./App";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/random" element={<Randomiser />} />
      </Routes>
    </>
  );
};

export default AppRouter;

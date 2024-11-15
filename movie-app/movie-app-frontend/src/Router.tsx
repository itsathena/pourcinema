import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Navbar from "./NavBar";
import Randomiser from "./Randomiser";

const AppRouter = () => {
  return (
    <Router>
      <Navbar /> {/* Always render the navbar */}
      <Routes>
        <Route path="/" element={<App />} /> {/* Home page */}
        <Route path="/random" element={<Randomiser />} />{" "}
        {/* Randomiser page */}
      </Routes>
    </Router>
  );
};

export default AppRouter;

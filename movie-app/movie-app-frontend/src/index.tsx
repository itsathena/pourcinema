import ReactDOM from "react-dom/client"; // Importing the new ReactDOM for React 18
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import "./index.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement); // Create root for React 18+

root.render(
  <Router>
    <AppRouter />
  </Router>
);

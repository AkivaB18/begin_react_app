import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import LoginPage from "./LoginPage.jsx";
import "./index.css";
import Pantry from "./Pantry.jsx";
const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<LoginPage />);

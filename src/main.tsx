import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <Router basename={window.location.pathname.replace(/(\/[^/]+)$/, "")}>
        <App />
    </Router>
);

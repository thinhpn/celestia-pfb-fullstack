import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const containerStyle = {
    width: "1000px",
    margin: "0 auto",
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <div style={containerStyle}>
        <App />
    </div>
);

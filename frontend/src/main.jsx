import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  setAuthTokenGetter,
  setBaseUrl,
} from "@workspace/api-client-react";

// Change this to your backend URL
setBaseUrl("http://10.43.65.189:5000");

setAuthTokenGetter(() => localStorage.getItem("byteshare_token"));

createRoot(document.getElementById("root")).render(<App />);
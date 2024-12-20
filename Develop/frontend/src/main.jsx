import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { PrimeReactProvider } from "primereact/api";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </ThemeProvider>
  </StrictMode>
);

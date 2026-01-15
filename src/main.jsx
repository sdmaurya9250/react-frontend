import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// 1. Import these two from the library
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
import App from "./App";
import "./index.css";

// 2. Create a new instance of the QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 3. Wrap everything inside the Provider */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
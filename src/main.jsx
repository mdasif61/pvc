import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";
import Layout from "./layout/Layout.jsx";
import Bill from "./components/Bill.jsx";
import Home from "./components/Home.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import HomeContent from "./components/HomeContent.jsx";
import FolderData from "./components/FolderData.jsx";
import Details from "./components/Details.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<HomeContent />} />
              <Route path="/folders/:id/:name" element={<FolderData />} />
            </Route>
            <Route path="/bill" element={<Bill />} />
            <Route path="/details" element={<Details/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);

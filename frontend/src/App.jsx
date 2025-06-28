import { useState } from "react";
import {
  BrowserRouter as BR,
  Router,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Transactions from "./Pages/Dashboard/Transactions";
import Tables from "./Pages/Dashboard/Tables";
import Ask_AI from "./Pages/Dashboard/Ask_AI";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Titlebar } from "./Components/Titlebar/Titlebar";

const queryClient = new QueryClient();
const isElectron = window?.navigator?.userAgent
  ?.toLowerCase()
  .includes("electron");

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          {isElectron && <Titlebar />}
          <div className="app">
            <Sidebar />

            <Routes>
              <Route path="/" element={<Dashboard isElectron={isElectron} />} />
              <Route
                path="/transactions"
                element={<Transactions isElectron={isElectron} />}
              />
              <Route
                path="/ask_ai"
                element={<Ask_AI isElectron={isElectron} />}
              />
              <Route
                path="/tables"
                element={<Tables isElectron={isElectron} />}
              />
            </Routes>
          </div>
        </HashRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;

import { useState } from "react";
import { BrowserRouter as BR, Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Transactions from "./Pages/Dashboard/Transactions";
import Contact_Agent from "./Pages/Dashboard/Contact_Agent";
import Ask_AI from "./Pages/Dashboard/Ask_AI";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BR>
        <div className="app">
          <Sidebar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/ask_ai" element={<Ask_AI />} />
            <Route path="/contact_agent" element={<Contact_Agent />} />
          </Routes>
        </div>
      </BR>
    </QueryClientProvider>
  );
}

export default App;

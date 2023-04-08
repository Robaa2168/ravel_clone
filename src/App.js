import React from 'react';
import './App.css';
import { UserProvider } from "./components/context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from './components/AppLayout'; // Import the AppLayout component

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

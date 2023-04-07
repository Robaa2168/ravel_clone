import React from 'react';
import './App.css';
import { UserProvider } from "./components/context"; 
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Home from './components/home';
import Footer from './components/footer';
import Security from './components/security';
import Loan from './components/cryptoloan';
import Repay from './components/repay';
import Ticket from './components/ticket';
import Wallet from './components/wallet';
import Login from './components/Login';
import Signup from './components/signup';
import Application from './components/application';
import Verification from './components/verify';
import Accounts from './components/accounts';

function App() {
  const location = useLocation();
  const excludedRoutes = ["/login", "/signup", "/KYC", "/verify"];
  
  return (
    <UserProvider>
      <div id="cryptoon-layout" className="theme-tradewind">
        {!excludedRoutes.includes(location.pathname) && <Sidebar />}
        <div className="main px-lg-4 px-md-4">
        {!excludedRoutes.includes(location.pathname) &&  <Header />}
         
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Home />} />
            <Route path="/settings" element={<Security />} />
            <Route path="/loan" element={<Loan />} />
            <Route path="/repay" element={<Repay />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/KYC" element={<Application />} />
            <Route path="/verify" element={<Verification />} />
            <Route path="/accounts" element={<Accounts />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;

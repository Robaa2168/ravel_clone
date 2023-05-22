import React, { useEffect, useState } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar';
import Home from './home';
import Footer from './footer';
import Security from './security';
import Loan from './cryptoloan';
import Repay from './repay';
import Ticket from './ticket';
import Wallet from './wallet';
import Login from './Login';
import Sample from './sample';
import Signup from './signup';
import Application from './application';
import Verification from './verify';
import Accounts from './accounts';
import ProtectedRoute from './ProtectedRoute';
import { useUser } from './context';
import Header from './header';
import Activity from './activity';
import Wallet1 from "./wallet1/Wallet1";
import CreatePIN from './createpin';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const excludedRoutes = ['/login', '/signup', '/KYC', '/verify'];
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  if (loading) {
    return null; // Or replace with a loading component if desired
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 992) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div id="cryptoon-layout" className="theme-tradewind">
      {!excludedRoutes.includes(location.pathname) && (
        <Header onToggleSidebar={toggleSidebar} />
      )}

      <div className="container ">
        <Routes>
          <Route path="*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Security /></ProtectedRoute>} />
          <Route path="/loan" element={<ProtectedRoute><Loan /></ProtectedRoute>} />
          <Route path="/repay" element={<ProtectedRoute><Repay /></ProtectedRoute>} />
          <Route path="/ticket" element={<ProtectedRoute><Ticket /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          <Route path="/Activity" element={<ProtectedRoute><Activity /></ProtectedRoute>} />
          <Route path="/Currencies" element={<ProtectedRoute><Wallet1 /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/sample" element={<Sample />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/KYC" element={<Application />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/pin" element={<CreatePIN />} />
          <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
        </Routes>

        {!excludedRoutes.includes(location.pathname) && (
          <Footer />
        )}
      </div>
    </div>
  );
};

export default AppLayout;

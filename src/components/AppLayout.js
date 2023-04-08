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
import Signup from './signup';
import Application from './application';
import Verification from './verify';
import Accounts from './accounts';
import ProtectedRoute from './ProtectedRoute';
import { useUser } from './context';
import Header from './header';

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

  return (
  
       <div id="cryptoon-layout" className="theme-tradewind">
      {!excludedRoutes.includes(location.pathname) && <Sidebar isOpen={isSidebarOpen} />}
      <div className="main px-lg-4 px-md-4">
      {!excludedRoutes.includes(location.pathname) && <Header onToggleSidebar={toggleSidebar} />}
        <Routes>
          <Route path="*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Security /></ProtectedRoute>} />
          <Route path="/loan" element={<ProtectedRoute><Loan /></ProtectedRoute>} />
          <Route path="/repay" element={<ProtectedRoute><Repay /></ProtectedRoute>} />
          <Route path="/ticket" element={<ProtectedRoute><Ticket /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/KYC" element={<Application />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
};

export default AppLayout;

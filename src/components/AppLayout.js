import React, { useEffect, useState } from "react";
import { useLocation, Route, Routes } from "react-router-dom";
// import Sidebar from './sidebar';
import Home from "./home";
import Footer from "./footer";
import Loan from "./cryptoloan";
import Repay from "./repay";
import Ticket from "./ticket";
import Wallet from "./wallet";
import Login from "./Login";
import Signup from "./signup";
import Application from "./application";
import Verification from "./verify";
import Accounts from "./accounts";
import ProtectedRoute from "./ProtectedRoute";
import { useUser } from "./context";
import Header from "./header";
import Activity from "./activity";
import Wallet1 from "./wallet1/Wallet1";
import Settings from "./settings/Settings";
import CreatePIN from "./createpin";
import ForgotPassword from "./ForgotPassword";
import VerificationForgot from "./verify_forgot";
import ResetPassword from "./resetPassword";
import SendAndRequest from "./sendAndRequest/SendAndRequest";
import FinishRequest from "./sendAndRequest/FinishRequest";
import FinishRequestFrom from "./sendAndRequest/FinishRequestFrom";
import Help from "./help/Help";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const excludedRoutes = [
    "/login",
    "/signup",
    "/KYC",
    "/verify",
    "/forgot-password",
    "/verify_forgot",
    "/create_password",
  ];
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

  // const handleLinkClick = () => {
  //   if (window.innerWidth <= 992) {
  //     setIsSidebarOpen(false);
  //   }
  // };

  return (
    <div id="cryptoon-layout" className="theme-tradewind">
      {!excludedRoutes.includes(location.pathname) && (
        <Header onToggleSidebar={toggleSidebar} />
      )}

      <div className="container ">
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loan"
            element={
              <ProtectedRoute>
                <Loan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/repay"
            element={
              <ProtectedRoute>
                <Repay />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ticket"
            element={
              <ProtectedRoute>
                <Ticket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/send-and-request/*"
            element={
              <ProtectedRoute>
                <SendAndRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Activity"
            element={
              <ProtectedRoute>
                <Activity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Currencies"
            element={
              <ProtectedRoute>
                <Wallet1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complete_send"
            element={
              <ProtectedRoute>
                <FinishRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complete_request"
            element={
              <ProtectedRoute>
                <FinishRequestFrom />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify_forgot" element={<VerificationForgot />} />
          <Route path="/create_password" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/KYC" element={<Application />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/verify" element={<Verification />} />
          <Route
            path="/pin"
            element={
              <ProtectedRoute>
                <CreatePIN />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <ProtectedRoute>
                <Accounts />
              </ProtectedRoute>
            }
          />
          <Route path="/help" element={<Help />} />
        </Routes>

        {!excludedRoutes.includes(location.pathname) && <Footer />}
      </div>
    </div>
  );
};

export default AppLayout;

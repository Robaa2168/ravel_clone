import React from "react";
import SendRequestHeader from "./sendRequestHeader/SendRequestHeader";
import { Route, Routes } from "react-router-dom";
import SendTo from "./SendTo";
import RequestFrom from "./RequestFrom";
import Contacts from "./Contacts";
import More from "./More";

function SendAndRequest() {
  return (
    <div>
      <SendRequestHeader />
      <Routes>
          <Route path="/" element={<SendTo />} />
          <Route path="/send-to" element={<SendTo />} />
          <Route path="/request-from" element={<RequestFrom />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/more" element={<More />} />
        </Routes>
    </div>
  );
}

export default SendAndRequest;

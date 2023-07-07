import React, { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import "./SendRequestheader.css";

const SendRequestHeader = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();
  const match = useMatch("/send-and-request/:subPage");

  const handleLinkClick = (subPage) => {
    navigate(`/send-and-request/${subPage}`);
  };

  const activeSubPage = match?.params?.subPage;

  const handleNext = () => {
    setSlideIndex((slideIndex + 1) % 4);
  };

  const handlePrevious = () => {
    setSlideIndex((slideIndex + 3) % 4);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="sendReq-header" {...handlers}>
      <ul>
        <li
          onClick={() => handleLinkClick("send-to")}
          className={activeSubPage === "send-to" ? "active" : "pypl-link"}
        >
          Send
        </li>
        <li
          onClick={() => handleLinkClick("request-from")}
          className={activeSubPage === "request-from" ? "active" : "pypl-link"}
        >
          Request
        </li>
        <li
          onClick={() => handleLinkClick("contacts")}
          className={activeSubPage === "contacts" ? "active" : "pypl-link"}
        >
          Contacts
        </li>
        <li
          onClick={() => handleLinkClick("more")}
          className={activeSubPage === "more" ? "active" : "pypl-link"}
        >
          More
        </li>
      </ul>
    </div>
  );
};

export default SendRequestHeader;

import React, { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import styles from "./SendRequestheader.module.css";

const SendRequestHeader = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();
  const match = useMatch("/send-and-request/:subPage");

  const handleLinkClick = (subPage) => {
    navigate(`/send-and-request/${subPage}`);
  };

  const activeSubPage = match?.params?.subPage;

  const handleSwipe = (eventData) => {
    if (eventData.dir === "Left") {
      setSlideIndex((slideIndex + 1) % 4);
    } else if (eventData.dir === "Right") {
      setSlideIndex((slideIndex + 3) % 4);
    }
  };

  const swipeHandlers = useSwipeable({ onSwiped: handleSwipe });

  return (
    <div className={styles.sendReqHeader} {...swipeHandlers}>
      <ul>
        <li
          onClick={() => handleLinkClick("send-to")}
          className={activeSubPage === "send-to" ? styles.active : styles.pyplLink}
        >
          Send
        </li>
        <li
          onClick={() => handleLinkClick("request-from")}
          className={activeSubPage === "request-from" ? styles.active : styles.pyplLink}
        >
          Request
        </li>
        <li
          onClick={() => handleLinkClick("contacts")}
          className={activeSubPage === "contacts" ? styles.active : styles.pyplLink}
        >
          Contacts
        </li>
        <li
          onClick={() => handleLinkClick("more")}
          className={activeSubPage === "more" ? styles.active : styles.pyplLink}
        >
          More
        </li>
      </ul>
    </div>
  );
};

export default SendRequestHeader;

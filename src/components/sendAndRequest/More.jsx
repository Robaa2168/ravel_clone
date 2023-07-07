import React from "react";
import "./More.css"
import { RiBookletLine } from "react-icons/ri";

function More() {
  return (
    <div className="send-money4">
      <RiBookletLine className="ways-icon4" />
      <p className="p4">Create an invoice</p>
      <p className="p5">Customize, track, and send invoices.</p>
      <button id="btn4">Get Started</button>
    </div>
  )
}

export default More;
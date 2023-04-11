import React from "react";
import styled, { keyframes } from "styled-components";

const drawCheck = keyframes`
  0% {
    stroke-dashoffset: 48;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const drawCircle = keyframes`
  0% {
    stroke-dashoffset: 150;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const CheckmarkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  position: relative;
`;

const CheckmarkShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0));
  bottom: 3px;
`;

const Checkmark = styled.svg`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const CheckmarkCircle = styled.circle`
  stroke: #28a745;
  stroke-width: 2;
  stroke-dasharray: 150;
  stroke-dashoffset: 150;
  fill: none;
  animation: ${drawCircle} 1s 0.3s ease forwards;
`;

const CheckmarkCheck = styled.path`
  stroke: #28a745;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  fill: none;
  animation: ${drawCheck} 0.6s 1.4s ease forwards;
`;

const AnimatedCheckmark = () => {
  return (
    <CheckmarkContainer>
      <CheckmarkShadow />
      <Checkmark xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <CheckmarkCircle cx="26" cy="26" r="25" />
        <CheckmarkCheck d="M14.1 27.2l6.5 6.5L37.7 16.6" />
      </Checkmark>
    </CheckmarkContainer>
  );
};

export default AnimatedCheckmark;

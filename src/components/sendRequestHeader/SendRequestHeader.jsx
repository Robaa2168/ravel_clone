import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import './SendRequestheader.css';

const SendRequestHeader = () => {
  const [slideIndex, setSlideIndex] = useState(0);

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
    trackMouse: true
  });

  return (
    <div className='sendReq-header' {...handlers}>
      <ul style={{ transform: `translateX(-${slideIndex * 25}%)`, transition: '0.3s' }}>
        <Link to='/send-money' className='pypl-link active'>Send</Link>
        <Link to='/request-money' className='pypl-link'>Request</Link>
        <Link className='pypl-link'>Contacts</Link>
        <Link className='pypl-link'>More</Link>
      </ul>
    </div>
  );
};

export default SendRequestHeader;

"use client"
import React, { useState, useEffect } from 'react';
import ScrollUpIcon from "/public/asset/scrollUp.svg";

export default function ScrollUp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = (event) => {
      const isScrollingUp = event.deltaY < 0;
      setIsVisible(isScrollingUp && window.scrollY !== 0);
    };

    window.addEventListener('wheel', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const handleClick = () => {
    // 맨 위로 스크롤
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 효과
    });
    setIsVisible(false);
  };

  return (
    <span
      className={`scrollup-wrap ${isVisible ? 'visible' : 'invisible'}`}
      onClick={handleClick}
    >
      <ScrollUpIcon />
    </span>
  );
}
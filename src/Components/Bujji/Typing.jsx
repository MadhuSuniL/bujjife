import React, { useState, useEffect } from 'react';

const WordTypewriter = ({ text, typeSpeed, onBegin, onComplete, animate }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    if (onBegin && currentWordIndex === 0) onBegin();  

    const intervalId = setInterval(() => {
      if (currentWordIndex < words.length) {
        setDisplayText(prevText => (prevText ? prevText + ' ' + words[currentWordIndex] : words[currentWordIndex]));
        setCurrentWordIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(intervalId);
        if (onComplete) onComplete();
      }
    }, typeSpeed);

    return () => clearInterval(intervalId);
  }, [words]);  

  return (
    <div className={animate &&'animate-pulse'}>
      <div dangerouslySetInnerHTML={{__html : displayText}} />
    </div>
  );
};

export default WordTypewriter;

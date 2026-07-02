'use client';

import { useState, useEffect } from 'react';

export const TypeWriter = ({ texts, speed = 60, delay = 2000, className = '' }) => {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    if (!currentText) return;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < currentText.length) {
          setDisplayed(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setDeleting(true), delay);
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts, speed, delay]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

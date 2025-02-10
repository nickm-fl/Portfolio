import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string | string[];
  delay?: number;
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
  showCursor?: boolean;
}

export default function TypewriterEffect({ 
  text, 
  delay = 100, 
  className = "", 
  onComplete,
  startDelay = 0,
  showCursor = true
}: TypewriterEffectProps) {
  const textArray = Array.isArray(text) ? text : [text];
  const [displayLines, setDisplayLines] = useState<string[]>(Array(textArray.length).fill(''));
  const [currentLine, setCurrentLine] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
      setCurrentIndex(0);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted) return;

    const currentText = textArray[currentLine];
    
    if (currentIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayLines(prev => {
          const newLines = [...prev];
          newLines[currentLine] = currentText.slice(0, currentIndex + 1);
          return newLines;
        });
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (currentLine < textArray.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentIndex(0);
      }, delay * 2);
      
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, currentLine, textArray, delay, hasStarted, onComplete]);

  return (
    <span className={`${className} font-mono flex flex-col`}>
      {displayLines.map((line, index) => (
        <span key={index}>
          {line}
          {showCursor && index === currentLine && <span className="animate-blink">|</span>}
        </span>
      ))}
    </span>
  );
} 
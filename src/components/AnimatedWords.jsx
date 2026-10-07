import React from 'react';

/**
 * AnimatedWords
 * Splits a text string into words that reveal sequentially from left to right
 * with a subtle blur dissipation ("nebbiolina / ombra") and smooth scale/slide transition.
 */
export default function AnimatedWords({ text, className = '', tag: Tag = 'span', baseDelay = 0.05, wordDelay = 0.07 }) {
  if (!text) return null;

  const words = text.split(' ');

  return (
    <Tag className={`velvera-animated-words ${className}`}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="velvera-word-unit"
          style={{
            animationDelay: `${baseDelay + index * wordDelay}s`
          }}
        >
          {word}
          {index < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
}

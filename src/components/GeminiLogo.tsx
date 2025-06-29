import React from 'react';

const GeminiLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gemini constellation pattern */}
      <defs>
        <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="25%" stopColor="#34A853" />
          <stop offset="50%" stopColor="#FBBC04" />
          <stop offset="75%" stopColor="#EA4335" />
          <stop offset="100%" stopColor="#9C27B0" />
        </linearGradient>
      </defs>
      
      {/* Main Gemini symbol - stylized twin stars */}
      <g fill="url(#geminiGradient)">
        {/* First star/diamond */}
        <path d="M8 4L10 6L8 8L6 6L8 4Z" />
        <path d="M8 10L10 12L8 14L6 12L8 10Z" />
        
        {/* Second star/diamond */}
        <path d="M16 4L18 6L16 8L14 6L16 4Z" />
        <path d="M16 10L18 12L16 14L14 12L16 10Z" />
        
        {/* Connecting lines representing the constellation */}
        <path d="M8 6L16 6" strokeWidth="2" stroke="url(#geminiGradient)" fill="none" />
        <path d="M8 12L16 12" strokeWidth="2" stroke="url(#geminiGradient)" fill="none" />
        
        {/* Additional constellation dots */}
        <circle cx="4" cy="9" r="1.5" />
        <circle cx="20" cy="9" r="1.5" />
        <circle cx="12" cy="18" r="1.5" />
        
        {/* Connecting constellation lines */}
        <path d="M6 6L4 9" strokeWidth="1" stroke="url(#geminiGradient)" fill="none" opacity="0.6" />
        <path d="M18 6L20 9" strokeWidth="1" stroke="url(#geminiGradient)" fill="none" opacity="0.6" />
        <path d="M8 14L12 18" strokeWidth="1" stroke="url(#geminiGradient)" fill="none" opacity="0.6" />
        <path d="M16 14L12 18" strokeWidth="1" stroke="url(#geminiGradient)" fill="none" opacity="0.6" />
      </g>
    </svg>
  );
};

export default GeminiLogo;
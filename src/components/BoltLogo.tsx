import React from 'react';

const BoltLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <img 
      src="/bolt_new_logo copy.png" 
      alt="Bolt.new Logo" 
      className={className}
    />
  );
};

export default BoltLogo;
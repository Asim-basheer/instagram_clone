import React from 'react';

const LeftNavPopLeft = ({ children, status = false }) => {
  return (
    <div
      className={`left-nav-popup-left background--other  border-right ${
        status ? 'active' : ''
      } `}
    >
      {children}
    </div>
  );
};

export default LeftNavPopLeft;

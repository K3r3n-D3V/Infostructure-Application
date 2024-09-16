import React from 'react';
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="assistant">
        <i className="fas fa-headset"></i> Online Assistant
      </div>
      <div className="actions">
        <i className="fas fa-user"></i> <span>Log Out</span>
      </div>
    </div>
  );
};

export default Topbar;

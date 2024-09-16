import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Custom styling for sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <i className="fas fa-building"></i>
      </div>
      <nav>
        <ul>
          <li><Link to="/">My Bank</Link></li>
          <li><Link to="/cards">Cards</Link></li>
          <li><Link to="/transfers">Transfers</Link></li>
          <li><Link to="/payments">Payments</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

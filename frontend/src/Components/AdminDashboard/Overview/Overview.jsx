import React from 'react';
import './Overview.css';
import { FaUsers, FaBell, FaDonate, FaHourglassHalf } from 'react-icons/fa';

const Overview = () => {
  const cards = [
    {
      title: 'Total Donations',
      value: '120+',
      icon: <FaDonate />,
      color: '#4caf50',
    },
    {
      title: 'Total Users',
      value: '300+',
      icon: <FaUsers />,
      color: '#2196f3',
    },
    {
      title: 'Pending Requests',
      value: '5',
      icon: <FaHourglassHalf />,
      color: '#ff9800',
    },
    {
      title: 'Active Alerts',
      value: '2',
      icon: <FaBell />,
      color: '#f44336',
    },
  ];

  return (
    <div className="overview-grid">
      {cards.map((card, idx) => (
        <div className="overview-card" key={idx} style={{ borderLeft: `8px solid ${card.color}` }}>
          <div className="icon" style={{ backgroundColor: card.color }}>
            {card.icon}
          </div>
          <div className="text">
            <h3>{card.value}</h3>
            <p>{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Overview;

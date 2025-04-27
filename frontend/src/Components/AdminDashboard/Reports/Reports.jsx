import React from 'react';
import './Reports.css';

const Reports = () => {
  return (
    <div className="reports-page">
      <h2>Admin Reports</h2>

      <div className="report-cards">
        <div className="card">
          <h3>Total Donations</h3>
          <p>1,250</p>
        </div>
        <div className="card">
          <h3>Active Users</h3>
          <p>450</p>
        </div>
        <div className="card">
          <h3>Expired Items</h3>
          <p>25</p>
        </div>
        <div className="card">
          <h3>Volunteers</h3>
          <p>120</p>
        </div>
      </div>

      <div className="dummy-graph">
        <p><strong>[Graph Placeholder]</strong></p>
        <p>(We'll add charts later using Chart.js or Recharts)</p>
      </div>
    </div>
  );
};

export default Reports;

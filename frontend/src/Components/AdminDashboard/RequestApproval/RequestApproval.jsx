import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RequestApproval.css";

const RequestApproval = () => {
  const [requests, setRequests] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminName = localStorage.getItem("admin");
    if (adminName === "Sravani") {
      setIsAuthenticated(true);
      fetchRequests();
    } else {
      setIsAuthenticated(false);
      navigate("/admin-dashboard");
    }
  }, [navigate]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests/admin/pending");
      console.log(res.data);
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/admin/approve/${id}`);
      fetchRequests();
    } catch (err) {
      console.error("Error approving request:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/admin/reject/${id}`);
      fetchRequests();
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  if (!isAuthenticated) {
    return <h3>Access Denied. Only admin can access this page.</h3>;
  }

  return (
    <div className="request-approval-wrapper">
      <h2>Requests Awaiting Approval</h2>
      {requests.length === 0 ? (
        <p className="no-requests">No pending requests.</p>
      ) : (
        <ul className="request-list">
          {requests.map((req) => (
            <li key={req._id} className="request-item">
              <div>
                <strong>{req.foodTitle}</strong> requested by{" "}
                <em>{req.receiverName}</em> from donor <em>{req.donorName}</em>
              </div>
              <div>
                <button onClick={() => handleApprove(req._id)}>Approve</button>
                <button onClick={() => handleReject(req._id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestApproval;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for redirection
import "./ManageUsers.css";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminName = localStorage.getItem("admin");
    if (adminName === "Sravani") {
      setIsAuthenticated(true);
      fetchPendingUsers();
    } else {
      setIsAuthenticated(false);
      navigate("/admin-dashboard"); // or show custom message
    }
  }, [navigate]);

  const fetchPendingUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/pending-users");
      console.log("Fetched Pending Users:", res.data);
      setPendingUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const approveUser = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve-user/${id}`);
      alert("User approved and notified via email!");
      fetchPendingUsers();
    } catch (error) {
      alert("Failed to approve user.");
    }
  };

  const rejectUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/reject-user/${id}`);
      alert("User rejected and notified via email.");
      fetchPendingUsers();
    } catch (error) {
      alert("Failed to reject user.");
    }
  };

  if (!isAuthenticated) {
    return <h3>Access Denied. Only admin can access this page.</h3>;
  }

  return (
    <div className="manage-users">
      <h2>Pending User Approvals</h2>

      {pendingUsers.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user._id}>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Role">{user.role}</td>
                <td data-label="Action">
                  <button className="approve-btn" onClick={() => approveUser(user._id)}>
                    Approve
                  </button>
                  <button className="reject-btn" onClick={() => rejectUser(user._id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;

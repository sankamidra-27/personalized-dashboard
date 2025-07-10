import React, { useEffect, useState } from 'react';
import './AccountModal.css';

const AccountModal = ({ onClose }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://jsonfakery.com/users/random')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Error fetching user:', err));
  }, []);

  if (!user) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img src={user.profile_pic} alt="Profile" className="profile-pic" />
          <h3>{user.first_name} {user.last_name}</h3>
        </div>
        <div className="modal-body">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AccountModal;

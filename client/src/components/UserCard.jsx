import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, getUsers } from "../JS/actions/userAction";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation dialog

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, user]);

  const handleDeleteClick = () => {
    setShowConfirmation(true); // Show confirmation modal
  };

  const confirmDelete = () => {
    dispatch(deleteUser(user._id));
    setShowConfirmation(false); // Close the confirmation dialog
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation dialog without deleting
  };

  return (
    <>
      <div className="user-card">
        <h2>{user.name}</h2>
        <div>
          <button onClick={handleDeleteClick}>Delete</button>
          <button className="details-btn" onClick={() => setShowDetails(true)}>
            See Details
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>User Details</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>ID:</strong> {user._id}</p>
            {/* Add more fields as needed */}
            <button onClick={() => setShowDetails(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to delete this user?</h3>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;

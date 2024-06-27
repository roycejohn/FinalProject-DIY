import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteAccount = ({ user, setUser }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/users/delete/${user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Assuming you might need authentication headers (token)
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null); // Update the state in App.jsx or wherever setUser is defined
      navigate("/account-deleted");
    } catch (error) {
      console.error("Error deleting account:", error);
      // Handle error state or display error to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete your account?</p>
      <button
        onClick={handleDeleteAccount}
        disabled={loading}
        className="w-full bg-black text-xl text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  );
};

export default DeleteAccount;

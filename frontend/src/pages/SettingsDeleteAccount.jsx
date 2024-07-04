import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DeleteAccount = ({ user, setUser }) => {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  const openConfirm = () => {
    setShowConfirm(true);
  };

  const closeConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="mb-4 text-center text-red-600">
        Are you sure you want to delete your account?
      </p>
      <button
        onClick={openConfirm} // Show confirmation dialog on button click
        disabled={loading}
        className="w-full max-w-sm bg-stone-700 text-xl text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>

      {/* Confirmation dialog */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="mb-4 text-center">
              Are you sure you want to delete your account?
            </p>
            <div className="flex justify-center">
              <button
                onClick={closeConfirm} // Close confirmation dialog
                className="mr-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount} // Proceed with account deletion
                disabled={loading}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                {loading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;

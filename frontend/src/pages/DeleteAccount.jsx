import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteAccount = ({ user, setUser }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://diy-server.onrender.com/users/delete/${user._id}`,
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
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="mb-4 text-center">Are you sure you want to delete your account?</p>
      <button
        onClick={handleDeleteAccount}
        disabled={loading}
        className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  );
};

export default DeleteAccount;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EditPassword = ({ user, setUser }) => {
  const [formValues, setFormValues] = useState({
    password: "",
  });

  console.log(user)

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  const userId = user._id;

  const handleInput = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { username, firstName, lastName, email, password } = formValues;
      const updatedUser = {
  
       password: password || undefined, // Ensure password is included if not empty
      };

      const response = await fetch(
        `https://diy-server.onrender.com/users/update/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      // UPDATE  state
      setUser(data);
      // UPDATE local storage
      localStorage.setItem("user", JSON.stringify(data));
      // NAVIGATE
      navigate("/profile");
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-24 p-6 bg-white h-screen"
      >
        <h2 className="text-3xl font-bold mb-10 text-center">Edit password</h2>
       
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-900 font-medium mb-2"
          >
          
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleInput}
            placeholder="Enter a new password..."
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:bg-gray-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-l text-white py-2 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Save Changes
        </button>

        <Link to="/profile">
          <button
            type="button"
            className=" ml-40 mt-4 w-32 bg-white text-l border border-gray-400 text-gray-900 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Go Back
          </button>
        </Link>
    
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </>
  );
};

export default EditPassword;

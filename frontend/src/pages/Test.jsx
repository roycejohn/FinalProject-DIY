import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteAccount from "./DeleteAccount";

const EditProfile = ({ user, setUser }) => {
  const [formValues, setFormValues] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
  });

  // console.log(user)

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
       // username,
        firstName,
        lastName,
       // email,
       // password: password || undefined, // Ensure password is included if not empty
      };

      const response = await fetch(
        `http://localhost:8000/users/update/${user._id}`,
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
        className="max-w-lg mx-auto mt-24 p-6 bg-white"
      >
        <h2 className="text-4xl font-bold mb-2 text-center">Edit Profile</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formValues.username}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-medium mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formValues.firstName}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-medium mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formValues.lastName}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-xl text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Save Changes
        </button>

        <div>
          {/*DELETE ACCOUNT Component*/}
          <DeleteAccount user={user} setUser={setUser} />
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </>
  );
};

export default EditProfile;

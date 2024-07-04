import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EditProfile = ({ user, setUser }) => {
  const [formValues, setFormValues] = useState({
    userImage: null,
    firstName: user.firstName,
    lastName: user.lastName,
    about: user.about,
  
  });

  // console.log(user)

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  const userId = user._id;

  const handleInput = (e) => {
    const {name, value, files } = e.target;   // added IMG
    // setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormValues((prev) => ({ ...prev, [name]: files ? files[0] : value }));  // added IMG
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(); 
    if (formValues.userImage) {
      formData.append("userImage", formValues.userImage);
    }
    formData.append("firstName", formValues.firstName); 
    formData.append("lastName", formValues.lastName); 
    formData.append("about", formValues.about); 


    try {

      const response = await fetch(
        `http://localhost:8000/users/update/${user._id}`,
        {
          method: "PUT",
          // headers: { "Content-Type": "application/json" },
          // body: JSON.stringify(updatedUser),
          body: formData,

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
        <h2 className="text-4xl font-bold mb-2 text-center">Edit Profile</h2>
        <div className="mb-4">
          <label
            htmlFor="userImage"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload your Image
          </label>
          <input
            type="file"
            name="userImage"
            id="userImage"
            //value={formValues.userImage}
            accept="image/*"
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
            htmlFor="about"
            className="block text-gray-700 font-medium mb-2"
          >
            About
          </label>
          <input
            type="text"
            name="about"
            id="about"
            value={formValues.about}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
    
          
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-700 text-xl text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Save Changes
        </button>

        <Link to="/profile">
          <button
            type="button"
            className=" ml-40 mt-8 w-24 bg-stone-700 text-xl text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Go Back
          </button>
        </Link>

         {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </>
  );
};

export default EditProfile;

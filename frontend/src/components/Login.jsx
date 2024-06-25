import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  // useState ---------------------------------------
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  // HANDLERS --------------------------------------
  const handleInput = (e) => {
    //console.log(e.target.name);
    //console.log(e.target.value)
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //console.log(formValues)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formValues.username || !formValues.password ) {
      setError("Both fields are reqired.")
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      // if(!response.ok) throw Error("Fetching error")   --- blocking error from backend

      const data = await response.json();
      localStorage.setItem("token", JSON.stringify(data.token));

      setUser(true);
      navigate("/")  // navigate to home after user is logged
      // console.log(user)
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // RETURN --------------------------------------------------
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-24 p-6 bg-white "
      >
        <h2 className="text-4xl font-bold mb-2 text-center">Welcome Back! </h2>
        <p className="text-center text-xl mb-6 text-gray-600">
          Log in below to acces your account.
        </p>

        <div className="mb-4 ">
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-2"
          ></label>

          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={formValues.username}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-4 ">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          ></label>
          <div className="relative ">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="password"
              value={formValues.password}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 px-3 py-2"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-xl text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Login
        </button>

        <Link  to="/signup" className="block text-center text-2xl underline mt-6 underline-offset-4 mt-10 mb-32">
          NOT A MEMBER? JOIN HERE
        </Link>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </>
  );
};

export default Login;

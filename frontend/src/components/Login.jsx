import { useState, useEffect } from "react";
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
  const navigate = useNavigate();

// Use effect for error timeout 

useEffect(() => { 
  if (error) {
  const timer = setTimeout( () => { setError(null) } , 4000) 
  return () => clearTimeout(timer) }
}, [error] )



  // HANDLERS --------------------------------------
  const handleInput = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.username || !formValues.password) {
      setError("Both fields are required.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("https://diyconnect.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if(!response.ok) {
        throw new Error (data.error || "Login faild");
      }

      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      navigate("/profile");
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
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white">
        <h2 className="text-4xl font-bold mb-2 text-center">Welcome Back!</h2>
        <p className="text-center text-xl mb-6 text-gray-700">
          Log in below to access your account.
        </p>

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
            placeholder="Username"
            value={formValues.username}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-gray-100"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-gray-100"
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
          className="w-full bg-gray-900 text-l text-white py-2 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link
          to="/register"
          className="block text-center text-xl underline mt-6 mb-32"
        >
          NOT A MEMBER? JOIN HERE
        </Link>

      {/*   {error && <p className="text-red-500 mt-4">{error}</p>}   */}  

      {error && (
          <div 
          className="flex items-center mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md animate-pulse">
            <span>{error}</span>
          </div>
        )}




      </form>
    </div>
  );
};

export default Login;

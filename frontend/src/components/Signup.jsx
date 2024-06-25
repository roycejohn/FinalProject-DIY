import { useState } from "react";

const Signup = ({ user, setUser }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    //console.log(e.target.name);
    //console.log(e.target.value)
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //console.log(formValues)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      // if(!response.ok) throw Error("Fetching error")   --- blocking error from backend

      const data = await response.json();
      localStorage.setItem("token", JSON.stringify(data.token));

      setUser(true);
      console.log(user);
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

  return (
    <>
      <div className="max-w-2xl mx-auto mt-24  p-6 bg-white ">
        <h2 className="text-4xl font-bold mb-2 text-center">
          Create Your Account
        </h2>
        <p className="text-center text-xl  text-gray-600">
          Register to recive exclusive offers, redeemable points, and more!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto   p-6 bg-white "
      >
        <div className="mb-4 ">
          {/*USERNAME*/}
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
        {/*FIRST NAME*/}
        <div className="mb-4 ">
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-medium mb-2"
          >
            {" "}
          </label>

          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="first name"
            value={formValues.firstName}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        {/*LAST NAME*/}
        <div className="mb-4 ">
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-medium mb-2"
          >
            {" "}
          </label>

          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="last name"
            value={formValues.lastName}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        {/*EMAIL*/}
        <div className="mb-4 ">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            {" "}
          </label>

          <input
            type="text"
            name="email"
            id="email"
            placeholder="email@example.com"
            value={formValues.email}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        {/*PASSWORD*/}
        <div className="mb-4">
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            ></label>

            <div className="relative">
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
                className="absolute inset-y-0 right-0 px-3 py-2 text-zinc-500"
              >
                {showPassword ? "Hide" : "Show"}{" "}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-lg text-white  mb-32  py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Register Now{" "}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </>
  );
};

export default Signup;

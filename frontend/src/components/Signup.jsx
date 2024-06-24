import { useState } from "react";

const Signup = ({user, setUser}) => {

  const [formValues, setFormValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)
  const[loading, setLoading] = useState(false)

  const handleInput = (e) => {
    //console.log(e.target.name);
    //console.log(e.target.value)
    setFormValues((prev) => ({...prev, [e.target.name]: e.target.value }));
     //console.log(formValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

      setError(null)
      setLoading(true)

      try {
        const response = await fetch("http://localhost:8000/users/signup", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(formValues),
        })

        // if(!response.ok) throw Error("Fetching error")   --- blocking error from backend

          const data = await response.json()
          localStorage.setItem("token", JSON.stringify(data.token))

          setUser(true)
          console.log(user)
          console.log(data)
                
      }catch(error) {
        setError(error.message)
      }finally {
        setLoading(false)
      }
  }

  return (

    <>
      <form onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">

        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4 ">  
USERNAME
          <label htmlFor="username" 
           className="block text-gray-700 font-medium mb-2">Username</label>

          <input type="text" name="username" id="username" 
          value={formValues.username} onChange={handleInput}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500" />

        </div>
FIRST NAME
        <div className="mb-4 ">

          <label htmlFor="firstName" 
          className="block text-gray-700 font-medium mb-2">First Name</label>

          <input type="text" name="firstName" id="firstName" 
          value={formValues.firstName} onChange={handleInput}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500" />

        </div>
LAST NAME
        <div className="mb-4 ">

          <label htmlFor="lastName" 
          className="block text-gray-700 font-medium mb-2">Last Name</label>

          <input type="text" name="lastName" id="lastName" 
          value={formValues.lastName} onChange={handleInput}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500" />

        </div>
EMAIL 
        <div className="mb-4 ">

          <label htmlFor="email" 
          className="block text-gray-700 font-medium mb-2">Email </label>

          <input type="text" name="email" id="email" 
          value={formValues.email} onChange={handleInput}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500" />

        </div>
PASSWORD
        <div className="mb-4 bg-zinc-100">

          <label htmlFor="password"
          className="block text-gray-700 font-medium mb-2">Password</label>

          <input type="text" name="password" id="password" 
            value={formValues.password} onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500" />
       
        </div>
        
        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
            Sign in</button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>

    </>
  )
}

export default Signup
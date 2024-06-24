import { useState } from "react"

const Login = () => {

  
  const [ formValues, setFormValues ] = useState({

    username: "",
    password: "",
  })

  const handleInput = (e) => {
    console.log(e.target.name);
    console.log(e.target.value)

  }

  return (

    <>
      <form >

        <h2>Log in</h2>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={formValues.username} onChange={handleInput} />
        <br />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" value={formValues.password} onChange={handleInput} />

        <button>Log in</button>
      </form>

    </>
  )
}

export default Login
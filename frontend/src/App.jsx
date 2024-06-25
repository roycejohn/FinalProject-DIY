
import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Footer from './components/Footer'
import Header from './components/Header.jsx'
// import Projects from './pages/Projects.jsx'
import Community from './pages/Community.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import ProjectList from './pages/ProjectList.jsx'

function App() {
 
  const [user, setUser] = useState(null) 
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) { 
      setUser(true) } 
      else {
        setUser(false) }
      setLoading(false)
  }, []); 

  if(loading) {
    return <div>Loading..</div>
  }

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <div>
        <Routes>
          <Route path="/" element = {<Home />} />
          {/* <Route path="/projects" element = {<Projects />} /> */}
          <Route path="/projects" element = {<ProjectList />} />
          <Route path="/community" element = {user ? <Community/> : <Navigate to="/login" />} />
          <Route path="/about" element = {<About />} />
          <Route path="/profile" element = {user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element = {<Login setUser={setUser} />} />
          <Route path="/signup" element = {<Signup setUser={setUser} />} />

        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App


import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Footer from './components/Footer'
import Header from './components/Header.jsx'
import Projects from './pages/Projects.jsx'
import Community from './pages/Community.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

function App() {
 
  const [user, setUser] = useState(false) 

  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/projects" element = {<Projects />} />
          <Route path="/community" element = {user ? <Community/> : <Navigate to="/login" />} />
          <Route path="/about" element = {<About />} />
          <Route path="/profile" element = {<Profile />} />
          <Route path="/login" element = {<Login setUser={setUser} />} />
          <Route path="/signup" element = {<Signup setUser={setUser} />} />

        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App

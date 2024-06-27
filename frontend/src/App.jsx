
import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Footer from './components/Footer'
import Header from './components/Header.jsx'
import Community from './pages/Community.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ProjectList from './pages/ProjectList.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import EditProfile from './pages/EditProfile.jsx'
import AccountDeleted from './pages/AccountDeleted.jsx'

function App() {
 
  const [user, setUser] = useState(null) 
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));   
   // console.log(user)
    if (token && user) {   // added user insted true to update components with username etc.
      setUser(user) }       
      else {
        setUser(null) }  // changed from true to user
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
          <Route path="/projects" element = {<ProjectList />} />
          <Route path="/projects/:projectId" element= {<ProjectDetail />} />
          <Route path="/community" element = {user ? <Community/> : <Navigate to="/login" />} />
          <Route path="/about" element = {<About />} />
          <Route path="/profile" element = {user ? <Profile user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element = {<Login setUser={setUser} />} />
          <Route path="/register" element = {<Register setUser={setUser} />} />
          <Route path="/editprofile" element = { user ? <EditProfile user={user} setUser={setUser} /> : <Navigate to="login" />} />
          <Route path="/account-deleted" element={<AccountDeleted />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App

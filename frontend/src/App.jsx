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
<<<<<<< HEAD
import Discussion from './pages/Discussion.jsx'
=======
import EditPassword from './pages/SettingsPassword.jsx'
import EditEmail from './pages/SettingsEmail.jsx'
import DeleteAccount from './pages/SettingsDeleteAccount.jsx'
>>>>>>> 15510886e9c556ecce6a41a16e7637883a17b67b

function App() {
 
  const [user, setUser] = useState(null) 
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    try { 
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));   
   // console.log(user)
    if (token && user) {   // added user insted true to update components with username etc.
      setUser(user) }       
      else {
        setUser(null) }  // changed from true to user
      }
      catch(error) {
        console.error("Failed to parse user from local storage, error")
        setUser(null)
      }finally{
        setLoading(false)
      }
      
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
          <Route path="/community" element = {<Community />} />
          <Route path="/discussion" element = {<Discussion user={user} setUser={setUser}/>} />
          <Route path="/about" element = {<About />} />
          <Route path="/profile" element = {user ? <Profile user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element = {<Login setUser={setUser} />} />
          <Route path="/register" element = {<Register setUser={setUser} />} />
          <Route path="/editprofile" element = { user ? <EditProfile user={user} setUser={setUser} /> : <Navigate to="login" />} />
          <Route path="/delete-account" element={<DeleteAccount user={user} setUser={setUser} />} />
          <Route path="/account-deleted" element={<AccountDeleted />} />
          <Route path="/password" element={< EditPassword user={user} setUser={setUser}/>} />
          <Route path="/email" element={<EditEmail user={user} setUser={setUser} />} />

        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App

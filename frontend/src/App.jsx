
import './App.css'
import { Routes,Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Footer from './components/Footer'
import Header from './components/Header.jsx'
import Community from './pages/Community.jsx'
import ProjectList from './pages/ProjectList.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'

function App() {
 

  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/projects" element = {<ProjectList />} />
          <Route path="/projects/:projectId" element= {<ProjectDetail />} />
          <Route path="/community" element = {<Community/> } />
          <Route path="/about" element = {<About />} />
          <Route path="/profile" element = {<Profile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App

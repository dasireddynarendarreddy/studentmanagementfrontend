
import './App.css'
import Add from './student/Add'
import {Link, Route, Routes} from "react-router-dom"  
import ViewStudent from './student/ViewStudent'
function App() {

  const navStyle = {
    background: "#3C3489",
    padding: "12px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const logoStyle = {
    color: "#EEEDFE",
    fontSize: "16px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };
  

  return (
  <>
   <div style={navStyle}>
        <div style={logoStyle}>
          &#127979; Student Management
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" style={{ color: "#AFA9EC", fontSize: "14px", cursor: "pointer" }}>
            Dashboard
          </Link>
          <Link to="/students" style={{ color: "#AFA9EC", fontSize: "14px", cursor: "pointer" }}>
            Students
          </Link>
          <Link to="/courses" style={{ color: "#AFA9EC", fontSize: "14px", cursor: "pointer" }}>
            Courses
          </Link>
        </div>
      </div>
  <Routes>
    <Route path='/students' element={<Add/>}/>
    <Route path='/students/:id' element={<ViewStudent/>}/>
    <Route path='/' element={<div>Dashboard</div>}/>
    <Route path='/courses' element={<div>Courses</div>}/>
  </Routes>
   
  </>
  )
}

export default App

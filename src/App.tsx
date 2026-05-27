
import './App.css'
import Add from './student/Add'
import {Link, Route, Routes} from "react-router-dom"  
import ViewStudent from './student/ViewStudent'
import Dashboard from './dashboard/Dashboard'
import AllCourses from './courses/AllCourses'
import { ProtectedRoute } from './components/ui/ProtectedRoute'
import { AllRoutes } from './components/ui/AllRoutes'
function App() {

 
  

  return (
  <>
  
  {/*<Routes>
    <Route path='/login' element={<h1 style={{textAlign:"center", marginTop:"40px"}}>Login Page</h1>}/>
    <Route path='/signup' element={<h1 style={{textAlign:"center", marginTop:"40px"}}>Sign Up Page</h1>}/>
    
    
    </Routes>*/}
    <AllRoutes>
      <AllCourses/>
      </AllRoutes>
    
   
  </>
  )
}

export default App

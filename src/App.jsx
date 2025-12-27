 import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { Routes,Route } from 'react-router-dom'

 
 function App() {
 

   return (
     <div className=''>
       
       <Routes>
        <Route path='/register' element ={<Register/>}/>
        <Route path = '/login' element = {<Login/>}/>
      
       </Routes>
       
     </div>
   )
 }
 
 export default App
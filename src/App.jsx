 import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { Routes,Route } from 'react-router-dom'
import Hotels from './pages/Hotels'
import Booking from './pages/Booking'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'

import AdminRegister from './pages/AdminRegister'
import AddHotel from './pages/AddHotel'
import AdminDashboard from './pages/AdminDashboard'
import MyListings from './pages/MyListings'
import EditHotel from './pages/EditHotel'
import AdminLogin from './pages/AdminLogin'

 
 function App() {
 

   return (
     <div className=''>
       <Navbar />
        
       <Routes>
        <Route path='/register' element ={<Register/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path='/' element={<Hotels/>}/>     
        <Route path = '/hotel/:id' element ={<Booking/>} />
        <Route path = '/profile' element = {<Profile/>} />  


        {/* //admin routes */}
         <Route path='/admin'>
         <Route path='login' element={<AdminLogin/>}/>
           <Route path='register' element={<AdminRegister/>}/>
          <Route path='addhotel' element={<AddHotel/>}/>   
          <Route path='dashboard' element = {<AdminDashboard/>}/>
          <Route path='mylistings' element ={<MyListings/>}/>
          <Route path = 'edithotel/:id' element = {<EditHotel/>}/>
        
         </Route>
         <Route path ="*" element={<h1>404 Not Found</h1>}/> 
         
       </Routes>
       
     </div>
   )
 }
 
 export default App
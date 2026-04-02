
import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import ContactMe from "./pages/ContactMe"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
/*import PrivateRoute from "./Compo/PrivateRoute"
import OnlyAdminPrivateRoute from "./Compo/OnlyAdminPrivateRoute"

import Header from "./components/Header"
 import 'flowbite';// Ensure this is in your entry file
import FooterCom from "./Compo/FooterCom"
import CreatePost from "./pages/Admin/CreatePost"
import UpdatePost from "./pages/Admin/UpdatePost"
import Postpage from "./Compo/Postpage"
import ScrollToTop from "./Compo/ScrollToTop"
import Search from "./pages/Search/Search"*/


function App() {
 

  return (
    <Router>
     {/* <ScrollToTop/>
      <Header/>*/}
       <Routes>
        <Route path ="/" element ={<Home/>} />
        <Route path ="/about" element ={<About/>} />
        <Route path ="/contact" element ={<ContactMe/>} />
        <Route path ="/sign-in" element ={<SignIn/>} />
        <Route path ="/sign-up" element ={<SignUp/>} />
        
        {/*<Route path ="/search" element ={<Search/>} />
        <Route element={<PrivateRoute/>}>
        <Route path ="/dashboard" element ={<Dashboard/>} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path ="/create-post" element ={<CreatePost/>} />
        <Route path ="/update-post/:postId" element ={<UpdatePost/>} />
        </Route>
        
       
        <Route path ="/post/:postSlug" element ={<Postpage/>} />
        */}
       </Routes>
          
        {/*
       <FooterCom/>
       */}
    </Router>
  )
}

export default App

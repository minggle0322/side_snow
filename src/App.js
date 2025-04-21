import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/main";
import Header from "./pages/header";
import Signup from "./pages/signup";
import Login from "./pages/login";
import BoardPage from './pages/BoardPage';
import Resorts from './pages/resorts/ResortPage';


function App() {

   return (
    <Router>
       <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/board/*" element={<BoardPage />} />
          <Route path="/resorts/*" element={<Resorts/>} />
        </Routes>
       </div>
    </Router>
   );
}
export default App;
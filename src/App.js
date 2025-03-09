import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/main";
import Header from "./pages/header";
import Signup from "./pages/signup";
import Login from "./pages/login";

function App() {
  const [hello, setHello] = useState('')

  useEffect(() => {
      axios.get('/api/hello')
      .then(response => setHello(response.data))
      .catch(error => console.log(error))
  }, []);



   return (
    <Router>
       <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        백엔드에서 가져온 데이터입니다 : {hello}
       </div>
    </Router>
   );
}
export default App;
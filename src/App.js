import {React,useEffect, useState} from 'react';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

const App = () => {

  const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
    
  }, [])

  return (
  <div>
    
    <BrowserRouter>
    
     <div>
      
      <Routes>
        
        <Route path='/register' element={<Register/>}/>
        
        <Route path='/' element={<Login setToken={setToken}/> } />
        
        {token?<Route path={'/home'} element={ <Home/>} />:""}
      
      </Routes>
    
    </div>
    
    </BrowserRouter>
  
  </div>
  );
};

export default App;

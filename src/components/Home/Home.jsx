import React from 'react';
import './Home.scss';
import { useNavigate } from 'react-router-dom'

const Home = () => {

  let navigate = useNavigate()
  
  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to the Polling Page!!</h2>

      <button className='logout-btn' onClick={handleLogout}>Logout</button>

    </div>
  );
}

export default Home;

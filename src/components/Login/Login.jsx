import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {supabase} from '../../supabase';
import './Login.scss';

const Login = ({setToken}) => {
  let navigate = useNavigate()
  
  const [formData,setFormData] = useState({
        email:'',password:''
  })

  console.log(formData);

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }

    })

  }

  async function handleSubmit(e){
    e.preventDefault()

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })

      if (error){
        throw error
      } 
      
      console.log(data)
      setToken(data)
      navigate('/home')
      
    } catch (error) {
      
      alert(error)
    }
  }


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>

      <input className='login-input' placeholder='email'  name='email' onChange={handleChange}/>
        
        <input type="password" className="login-input" placeholder="Password"  name='password' onChange={handleChange} />
        
        <button type="submit" className="login-button">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;

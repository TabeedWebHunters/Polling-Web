import React, { useState } from 'react';
import {supabase} from '../../supabase';
import { Link} from 'react-router-dom';
import './Register.scss';


const Register = () => {
  
  const [formData, setFromData] = useState({
  
    username: '', email:'', password: ''
  
  })
  
  function handleChange(event) {
    
    setFromData((prevFormData)=>{
      
      return {
      
        ...prevFormData,
        
        [event.target.name]:event.target.value
      
      }
    
    })

  }

 async function handleSubmit(e){
  e.preventDefault()
    
  try {
      
      const {data, error} = await supabase.auth.signUp({
        
        email: formData.email,
        
        password: formData.password,
        
        options: {
          name: formData.name
        }
      
      })

      
      
      console.log(data)
      
      alert('Registration successful. Please check your email for verification link.');

    } catch(error) {

      alert(error)
    
    }
 }


  return (
    <div className="register-container">
      
      <h2>Register</h2>
      
      <form className="register-form" onSubmit={handleSubmit}>
        
        <input  className="register-input" placeholder="Username" name='username' onChange={handleChange} />
        
        <input className='register-input' placeholder='email'  name='email' onChange={handleChange}/>
        
        <input type="password" className="register-input" placeholder="Password"  name='password' onChange={handleChange} />
        
        <button type="submit" className="register-button">Register</button>
      
      </form>

      <p>Already have an account? <Link to="/">Login</Link></p>

    </div>
  );
};

export default Register;

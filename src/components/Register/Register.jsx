import React, { useState } from 'react';
import {supabase} from '../../supabase';
import { Link} from 'react-router-dom';
import './Register.scss';

const Register = () => {
  
  const [formData, setFromData] = useState({
  
    username: '', email:'', password: ''
  
  })
  console.log(formData);
  
  function handleChange(event) {
    
    setFromData((prevFormData)=>{
      
      return {
      
        ...prevFormData,
        
        [event.target.name]:event.target.value
      
      }
    
    })

  }

 async function handleSubmit(e){
  e.preventDefault();

    try {
      const { authData, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          name: formData.name
        }
      });

      console.log(authData);

      const user = {
        name: formData.username,
        email: formData.email,
        password: formData.password
      };

      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        console.log('User inserted into the database');
        alert('Registration successful. Please check your email for verification link.');
      } else {
        const errorData = await response.json();
        console.error('Failed to insert the user into the database:', errorData);
        alert('Failed to insert the user into the database');
      }
    } catch (error) {
      console.error('Error during user registration:', error);
      alert('Error during user registration');
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

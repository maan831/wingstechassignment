import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase';

export default function Register() {
    
        const[email,setEmail] = useState('');
        const[password,setPassword] = useState('');

        const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth,email,password);
            alert('Registration Succesfull');
        } catch (error) {
            alert(error.message);
        }
        }
    
  return ( <form onSubmit={handleRegister}>
      <h1>Register</h1>
      <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your email'/>
      <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)}placeholder= 'Enter your Password'/>
      <button type='submit'>Register</button>
  </form> )
}

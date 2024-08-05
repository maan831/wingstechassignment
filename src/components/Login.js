import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase';

export default function Login() {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth,email,password);
            alert('Login Succcesful');
        } catch (error) {
            alert(error.message);
        }
    }
  return (
    <form onSubmit={handleLogin}>
      <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='enter your email' />
      <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='enter your password' />
      <button type='submit'>Submit</button>
    </form>
      )
}

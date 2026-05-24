import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router';
import {useAuth} from '../hooks/useAuth';

export function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const{ Loading, handleRegister} = useAuth();


  async function handleSubmit(e){
    e.preventDefault();
    await handleRegister({username, email, password});
    navigate('/login');
  }

  if(Loading){
    return (<main>
        <h1>Loading...</h1>
    </main>)
  }

  return (
    <main>
    <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

            <div className='input-group'>
                <label htmlFor="username">Username</label>
                <input
                 onChange={(e)=>{setUsername(e.target.value)}}
                 type="text" id='username' placeholder="John Doa" name='username' />
            </div>

            <div className='input-group'>
                <label htmlFor="email">Email</label>
                <input
                 onChange={(e)=>{setEmail(e.target.value)}}
                 type="text" id='email' placeholder="John@gmail.com" name='email' />
            </div>
            <div className='input-group'>
                <label htmlFor="password">Password</label>
                <input
                 onChange={(e)=>{setPassword(e.target.value)}}
                 type="password" id='password' placeholder="Enter your password" name='password' />
            </div>

            <button className='button primary-button' type='submit'>Register</button>

        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
   </main>
  )
}

export default Register
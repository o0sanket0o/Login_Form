import React from 'react'
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { handleError, handleSuccess } from '../notify';
import { useNavigate, useLocation } from 'react-router-dom';
export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userInfo, setuserInfo] = useState({
        email:'',
        password:'',
    });
    const handleChange = (e) =>{
        setuserInfo({...userInfo, [e.target.name]: e.target.value})
    }
    async function submitForm(e){
        e.preventDefault();
        const {email, password} = userInfo;
        setuserInfo({
            email:'',
            password:'',
        });
        if(!email || !password){
            return handleError("Please enter both email and password.");
        }
        try{
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo),
            });
            const result = await response.json();
            const {success, message, error, name, token} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token', token);
                localStorage.setItem('name', name);
                navigate("/");
            }else if(error){
                handleError(error);
            }else if(message){
                handleError(message);
            }
        }catch(error){
            console.log("Error", error);
        }
    }
    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate("/");
        }
    }, [navigate])
    
  return (
    <div className='flex flex-col justify-center items-center'>
      Log In
        <form className='flex flex-col justify-center items-center' onSubmit={submitForm}>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' onChange={handleChange} className='border' placeholder='Enter your email' value={userInfo.email}/>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={handleChange} name='password'className='border' placeholder='Enter your password' value={userInfo.password} />
            <button type='submit' className='bg-black text-white rounded w-16'>Submit</button>
        </form>
    </div>
  )
}

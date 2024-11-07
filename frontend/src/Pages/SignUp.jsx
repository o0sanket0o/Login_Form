import React from 'react'
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { handleError, handleSuccess } from '../notify';
import { useNavigate } from 'react-router-dom';
export const SignUp = (isRegistered, setisRegistered) => {
    const navigate = useNavigate();
    const [userInfo, setuserInfo] = useState({
        name:'',
        email:'',
        password:'',
    });
    const handleChange = (e) =>{
        setuserInfo({...userInfo, [e.target.name]: e.target.value})
    }
    async function submitForm(e){
        e.preventDefault();
        const {name, email, password} = userInfo;
        setuserInfo({
            name:'',
            email:'',
            password:'',
        });
        if(!name || !email || !password){
            return handleError("Please enter name, email and password.");
        }
        try{
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo),
            });
            const result = await response.json();
            console.log(result);
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                navigate("/login");
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
        Sign Up 
        <form className='flex flex-col justify-center items-center' onSubmit={submitForm}>
            <label htmlFor='name'>Username</label>
            <input type='text' id='name' name='name' onChange={handleChange} className='border' placeholder='Enter your name' value={userInfo.name}/>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' onChange={handleChange} className='border' placeholder='Enter your email' value={userInfo.email}/>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={handleChange} name='password'className='border' placeholder='Enter your password' value={userInfo.password} />
            <button type='submit' className='bg-black text-white rounded w-16'>Submit</button>
        </form>
    </div>
  )
}

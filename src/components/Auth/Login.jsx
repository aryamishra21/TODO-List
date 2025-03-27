import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { BiSolidError } from "react-icons/bi";

const Login = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [data,setData]=useState({
      email:'',
      password:''
    });
    const [error,setError]=useState('');
    const navigate = useNavigate();
    const dispatch=useDispatch()

    useEffect(() => {
        if (isAuthenticated) navigate("/todos");
      }, [isAuthenticated]);

    const handleLogin=(e)=>{
        e.preventDefault()
        if(data.email===""){
          setError("Email is Empty!")
          return
        }
        if(data.password===""){
          setError("Password is Empty!")
          return 
        }

        dispatch(login())
        navigate('/todos')
    }
  return (
    <div className='bg-linear-to-b from-green-600 to-gray-300 h-screen w-full py-10'>
    <div className='w-[20rem] bg-linear-to-b from-blue-400 to-gray-400 mx-auto text-center p-3 mt-10 font-semibold rounded-lg'>
        <p className='text-xl'>Login</p>
        <form action="" className='flex flex-col gap-3 my-5 text-left' onSubmit={(e)=>handleLogin(e)}>
            <label htmlFor="email">Email</label>
            <input type="email" className='p-2 border rounded-lg ' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
            <label htmlFor="password">Password</label>
            <input type="password" className='p-2 border rounded-lg' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>
            <Button variant="contained" type='submit' className='mt-4'>Login</Button>
        </form>
        {error && <div className='text-red-800 flex items-center gap-2 justify-center'>
          <BiSolidError className='size-[1.5rem]' />
          <p>{error}</p>
          </div>}
    </div>
    </div>
  )
}

export default Login
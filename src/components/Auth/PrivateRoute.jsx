import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const isAuth=useSelector(store=>store.auth.isAuthenticated)
  return (
    <>
        {isAuth? <Outlet/>:<Navigate to="/login" replace/>}
    </>
  )
}

export default PrivateRoute
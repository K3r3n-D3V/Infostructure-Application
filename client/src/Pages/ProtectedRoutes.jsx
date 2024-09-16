import React from 'react'
import { Outlet, Navigate, Route} from 'react-router'


const ProtectedRoutes = ({signedIn}) => {
    const user = signedIn
    return user ? <Outlet/> : <Navigate to="/signup"/> || <Navigate to="/login"/>

   

}

export default ProtectedRoutes
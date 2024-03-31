import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const PrivateRoute = ()=>{

    //여기 토큰 정보 확인해야함
    const {isAuth} = useAuth();

    return(
        isAuth ? <Outlet/> : <Navigate to="/login" replace={true}/>
    );
    
}

export default PrivateRoute;
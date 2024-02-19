import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useToken } from "../provider/TokenContext";

const PrivateRoute = ()=>{

    //여기 토큰 정보 확인해야함
    const {token} = useToken();

    return(
        token ? <Outlet/> : <Navigate to="/login" replace={true}/>
    );
    
}

export default PrivateRoute;
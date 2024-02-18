import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TokenContext } from "../../App";

const PrivateRoute = ()=>{

    //여기 토큰 정보 확인해야함
    const {token} = useContext(TokenContext);

    return(
        token ? <Outlet/> : <Navigate to="/login" replace={true}/>
    );
    
}

export default PrivateRoute;
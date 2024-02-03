import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../App";

const PrivateRoute = ()=>{

    //여기 토큰 정보 확인해야함
    const token = false;

    return(
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;
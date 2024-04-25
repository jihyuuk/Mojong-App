import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthContext";

const LoginRouter = () => {

    //권한정보
    const { isAuth } = useAuth();

    if(isAuth){
        return <Navigate to="/" replace={true} />;
    }else{
        return  <Outlet/>
    }

}

export default LoginRouter;
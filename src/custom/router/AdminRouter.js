import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthContext";

const AdminRouter = () => {

    //권한정보
    const { role } = useAuth();

    if(role === 'ROLE_ADMIN'){
        return <Outlet />;
    }else{
        alert('관리자만 접근이 가능합니다.');
        return  <Navigate to="/" replace={true} />;
    }

}

export default AdminRouter;
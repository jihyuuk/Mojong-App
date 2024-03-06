import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useToken } from "../provider/TokenContext";
import { useInitData } from "../provider/InitDataContext";

const AdminRouter = () => {

    //여기 토큰 정보 확인해야함
    const { token } = useToken();

    //권한정보
    const { role } = useInitData();

    if(token && role === 'ROLE_ADMIN'){
        return <Outlet />;
    }else{
        alert('관리자만 접근이 가능합니다.');
        return  <Navigate to="/" replace={true} />;
    }


}

export default AdminRouter;
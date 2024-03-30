import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToken } from './TokenContext';
import { Spinner } from 'react-bootstrap';

//인증 컨텍스트
const AuthContext = createContext();

//인증 컨텍스트를 사용할 커스텀 훅
export function useAuth() {
    return useContext(AuthContext);
}

// 장바구니 컨텍스트 Provider
export function AuthProvider({ children }) {

    //토큰 관련 변수
    const { token, removeToken } = useToken();

    //isAuth <= 로그인 되어있는지
    //username <= 사용자이름
    //role <= 권한 등급
    //loading <= 로그인중....
    const [isAuth, setIsAuth] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('ROLE_USER');
    const [loading, setLoading] = useState(token ? true : false);


    //1.토큰 x => 아무것도 x 
    //2.토큰 0 => 서버로 로그인
    //            =>2-1. 정상 -> isAuth = true, 응답 데이터(username,role 등록)
    //            =>2-2. 만료 -> 토큰삭제

    useEffect(() => {
        //토큰이 있는경우만 실행
        if (!token) return;

        //서버로 토큰 유효성 검사
        axios.get(
            process.env.REACT_APP_API_URL + "/login/auto", { headers: { 'Authorization': token } })
            .then(response => {
                setUsername(response.data.username);
                setRole(response.data.role);
                setIsAuth(true);
                setLoading(false);                
            }).catch(error => {
                //401 미인증 응답 받았을시
                if (error.response && error.response.status === 401) {
                    removeToken();
                    setLoading(false);
                    return;
                }

                //백엔드 연결 실패 or 기타 에러
                alert("로그인 에러 발생!\n관리자에게 문의하세요");
            })

    }, []);


    //제공변수들
    const AuthContextValue = {
        isAuth,
        username,
        role
    };

    return (
        <>
            {loading ?
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <Spinner animation="border" />
                </div>
                :
                <AuthContext.Provider value={AuthContextValue}>
                    {children}
                </AuthContext.Provider>
            }
        </>
    );
}
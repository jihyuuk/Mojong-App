import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import axios from 'axios';
import { useToken } from './TokenContext';

//초기 데이터 컨텍스트
const MojongContext = createContext();

//초기 데이터 컨텍스트를 사용할 커스텀 훅
export function useMojong() {
    return useContext(MojongContext);
}

// 초기 데이터 컨텍스트 Provider
export function MojongProvider({ children }) {

    //모종리스트
    const [mojongs, setMojongs] = useState([]);

    const { isAuth } = useAuth();
    const { token } = useToken();


    //1.인증x => 아무것도 안함
    //2.인증0 => 서버에 모종데이터 요청
    useEffect(() => {
        //모종 데이터 받아오기
        fetchMojong();
    }, []);


    //모종 받아오는 함수
    const fetchMojong = () => {

       //로그인한 사용자만 데이터 요청
       if (!isAuth) return;

        axios.get(
            process.env.REACT_APP_API_URL + '/mojongs', { headers: { 'Authorization': token } })
            .then(response => {
                setMojongs(response.data);
            }).catch(error => {
                alert("데이터 불러오기 실패!");
            })
    }

    //제공변수들
    const MojongContextValue = {
        mojongs,
        fetchMojong
    };

    return (
        <>
            <MojongContext.Provider value={MojongContextValue}>
                {children}
            </MojongContext.Provider>
        </>
    );
}

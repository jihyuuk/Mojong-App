import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToken } from './TokenContext';
import ServerApi from '../../server/ServerApi';

//초기 데이터 컨텍스트
const InitDataContext = createContext();

//초기 데이터 컨텍스트를 사용할 커스텀 훅
export function useInitData() {
    return useContext(InitDataContext);
}

// 초기 데이터 컨텍스트 Provider
export function InitDataProvider({ children }) {

    const { token, isAuth, updateToken, removeToken } = useToken();

    //모종리스트
    const [mojongs, setMojongs] = useState([]);
    //사용자 이름
    const [username, setUsername] = useState('');
    //사용자 등급
    const [role, setRole] = useState('');

    //로딩
    const [loading, setLoading] = useState(false);


    //토큰 존재시 데이터 초기화
    useEffect(() => {

        if(!token) return;

        console.log('iniData : 초기데이터 받아오기')
        ServerApi('get', '/initData', null, token, removeToken, updateToken)
            .then(response => {
                setMojongs(response.mojongs);
                setUsername(response.username);
                setRole(response.role);
                setLoading(false);
            })
            .catch(error => {
                //에러처리
                console.log('에러')
                setLoading(false);
            });
    }, [token])

    //제공변수들
    const InitDataContextValue = {
        mojongs,
        username,
        role
    };

    //출력용====================================
    console.log("============= initDataProvider 랜더링 =============")
    //==========================================

    return (
        <>
            {loading ?
                // 로딩중
                <div className='my-container'>
                    <div className='my-content pb-0'>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <div className='text-center'>
                                <div className="spinner-border m-auto" role="status"></div>
                                <p className='fs-5 text-center mt-3'>데이터 불러오는 중...</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                //로딩성공
                <InitDataContext.Provider value={InitDataContextValue}>
                    {children}
                </InitDataContext.Provider>
            }
        </>
    );
}

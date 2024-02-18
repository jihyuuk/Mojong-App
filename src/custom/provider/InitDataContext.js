import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToken } from './TokenContext';

//초기 데이터 컨텍스트
const InitDataContext = createContext();

//초기 데이터 컨텍스트를 사용할 커스텀 훅
export function useInitData() {
    return useContext(InitDataContext);
}

// 초기 데이터 컨텍스트 Provider
export function InitDataContext({ children }) {

    const { token, removeToken, updateToken } = useToken();
    
    //모종리스트
    const [mojongs, setMojongs] = useState([]);
    //사용자 이름
    const [username, setUsername] = useState('');
    //사용자 등급
    const [role, setRole] = useState('');

    //서버에서 데이터 가져오기
    const fetchData = async () => {
        //1.서버에 토큰가지고 모종 데이터 요청
        //2.서버 응답 : 200, 201, 403
        //    200: 응답
        //    201: 응답,새토큰
        //    403: 존재하는 토큰 지우기
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/initData', {
                headers: {
                    'Authorization': token
                }
            });

            if (response.status === 200) {
                //데이터 불러오기성공시
                setMojongs(response.data.mojongs);
                setUsername(response.data.username);
                setRole(response.data.role);

                console.log(response.data.role);
                console.log(response.data.username);

            } else if (response.status === 201) {
                //토큰갱신
                const newToken = response.headers.get('Authorization');
                updateToken(newToken);

                //데이터 불러오기성공시
                setMojongs(response.data.mojongs);
                setUsername(response.data.username);
                setRole(response.data.role);
                
                console.log(response.data.role);
                console.log(response.data.username);
            } else {
                //지정하지 않은 상태코드
                console.error('서버 응답 상태코드 에러 : ' + response.status)
            }

        } catch (error) {
            if (error.response && error.response.status === 403) {
                //토큰 지우기
                removeToken();
                console.error('권한이 없습니다.');
            } else {
                console.error('서버 연결 중 오류 발생.', error.message);
            }
        }
    }

    //처음 마운트시 
    useEffect(() => {
        //토큰이 존재하면 서버에 데이터 요청하기
        if (token) fetchData();
    }, []);


    //제공변수들
    const InitDataContextValue = {
        mojongs,
        username,
        role
    };

    return (
        <InitDataContext.Provider value={InitDataContextValue}>
            {children}
        </InitDataContext.Provider>
    );
}

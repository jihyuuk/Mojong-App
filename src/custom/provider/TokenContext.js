import React, { createContext, useContext, useState } from 'react';

//토큰 컨텍스트
const TokenContext = createContext();

//토큰 컨텍스트를 사용할 커스텀 훅
export function useToken() {
    return useContext(TokenContext);
}

// 토큰 컨텍스트 Provider
export function TokenProvider({ children }) {

    //토큰
    const [token, setToken] = useState(localStorage.getItem('jwtToken'));

    //토큰삭제
    const removeToken = () => {
        setToken();
        localStorage.removeItem('jwtToken');
        console.log('tokenProvider : 토큰 삭제');
    }

    //토큰등록
    const updateToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('jwtToken', newToken);
        console.log('tokenProvider : 토큰 업데이트');
    }


    //제공변수들
    const TokenContextValue = {
        token,
        removeToken,
        updateToken
    };

    //출력용====================================
    console.log("============= tokenProvider 랜더링 =============")
    if(token){
        console.log("tokenProvider : 토큰존재");
    }else{
        console.log("tokenProvider : 토큰 없음")
    }
    //==========================================
    
    return (
        <TokenContext.Provider value={TokenContextValue}>
            {children}
        </TokenContext.Provider>
    );
}

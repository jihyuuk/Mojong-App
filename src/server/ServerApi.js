import axios from 'axios';

const ServerApi = async (method, url, data, token, removeToken, updateToken) => {
    
    try {
        const response = await axios({
            method: method, 
            url: process.env.REACT_APP_API_URL + url,
            data: data,
            headers: {
                'Authorization': token
            }
        });

        if (response.status === 201) {
            // 토큰 갱신
            updateToken(response.headers.get('Authorization'));
            console.log("토큰이 갱신되었습니다.");
        }
        
        return response.data; // 응답 데이터 반환

    } catch (error) {
        if (error.response && error.response.status === 403) {
            // 토큰이 만료된 경우
            removeToken();
            console.error('권한이 없습니다.');
        } else {
            console.error('서버 연결 중 오류 발생.', error.message);
            throw error
        }
    }
}

export default ServerApi;
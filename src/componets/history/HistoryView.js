import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ListGroup} from 'react-bootstrap';
import { TokenContext } from '../../App';
import { Link } from 'react-router-dom';

function HistoryView() {

    const [loading, setLoading] = useState(false);
    const { token, setToken } = useContext(TokenContext);
    const [histories, setHistories] = useState([]);

    const fetchHistory = async () => {

        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/history',
                {
                    headers: {
                        'Authorization': token,
                    }
                });

            if (response.status === 200) {
                //데이터 불러오기성공시
                setHistories(response.data);

            } else if (response.status === 201) {
                //토큰갱신
                const newToken = response.headers.get('Authorization');
                localStorage.setItem('jwtToken', newToken);
                setToken(newToken);

                console.log("토큰이 갱신되었습니다.");

                //데이터 불러오기성공시
                setHistories(response.data);
            } else {
                //지정하지 않은 상태코드
                console.error('서버 응답 상태코드 에러 : ' + response.status)
            }

        } catch (error) {
            if (error.response && error.response.status === 403) {
                //토큰 지우기
                setToken();
                localStorage.removeItem('jwtToken');
                console.error('권한이 없습니다.');
            } else {
                console.error('서버 연결 중 오류 발생.', error.message);
            }
        }

        //로딩끝
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchHistory();
    }, []);

    if (histories.length <= 0) {
        return (
            <section className='my-content'>
                <div className='fs-5 text-secondary d-flex align-items-center justify-content-center h-100'>
                    기록이 없습니다.
                </div>
            </section>
        );
    }
    
    return (
        <div className='my-content'>
            
            <ListGroup variant='flush' className='border-top border-bottom'>

                {histories.map((history => (

                    <ListGroup.Item>
                        <Link to={`/sale/${history.id}`}>

                            <div className='d-flex justify-content-between'>
                                <div>
                                    <div className='fw-bold mb-1 text-success' style={{ fontSize: '1.15rem' }}>
                                        {history.firstItem} {history.count > 1 ? `외 ${history.count - 1}개 ` : ''}
                                    </div>
                                    <div className='text-secondary'>판매번호 #{history.id}</div>
                                    <div className='text-secondary'>
                                        {history.createdDate}
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-end'>
                                    <div className='fw-semibold fs-5'>
                                        {history.finalPrice}원
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </ListGroup.Item>

                )))}

            </ListGroup>

        </div>
    );
}

export default HistoryView;
import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ServerApi from '../../server/ServerApi';
import { useToken } from '../../custom/provider/TokenContext';

function AllHistoryView() {

    const [histories, setHistories] = useState([]);
    const { token, removeToken, updateToken } = useToken();

    const fetchHistory = () => {
        ServerApi('get', '/allHistory', null, token, removeToken, updateToken)
            .then(response => {
                setHistories(response.content);
            })
            .catch(error => {
                //에러처리
                alert("데이터 불러오기 실패, 관리자에게 문의하세요")
                console.error(error);
            })
    }

    useEffect(() => {
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

                {histories.map((history, index) => (

                    <ListGroup.Item key={index}>
                        <Link to={`/sale/${history.id}`}>

                            <div className='d-flex justify-content-between'>
                                <div>
                                    <div className='fw-bold mb-1 text-success' style={{ fontSize: '1.15rem' }}>
                                        {history.firstItem} {history.count > 1 ? `외 ${history.count - 1}개 ` : ''}
                                    </div>
                                    <div className='text-secondary'>판매번호 #{history.id}</div>
                                    <div className='text-secondary'>판매자 {history.username}</div>
                                    <div className='text-secondary'>
                                        {history.createdDate}
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-end'>
                                    <div className='fw-semibold fs-5'>
                                        {history.finalPrice.toLocaleString('ko-KR')}원
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </ListGroup.Item>

                ))}

            </ListGroup>

        </div>
    );
}

export default AllHistoryView;
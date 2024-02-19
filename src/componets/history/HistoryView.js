import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ListGroup} from 'react-bootstrap';
import { TokenContext } from '../../App';
import { Link } from 'react-router-dom';
import ServerApi from '../../server/ServerApi';
import { useToken } from '../../custom/provider/TokenContext';

function HistoryView() {

    const [histories, setHistories] = useState([]);
    const {token, removeToken, updateToken} = useToken();

    const fetchHistory = () => {
        ServerApi('get','/history',null, token, removeToken, updateToken)
            .then(response => {
                setHistories(response);
            })
            .catch(error => {
                //에러처리
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

                {histories.map((history,index) => (

                    <ListGroup.Item key={index}>
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

                ))}

            </ListGroup>

        </div>
    );
}

export default HistoryView;
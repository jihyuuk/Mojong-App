import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ListGroup, Pagination} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useToken } from '../../custom/provider/TokenContext';

function HistoryView() {

    const [histories, setHistories] = useState([]);
    const { token } = useToken();

    //페이징
    const [totalPages, setTotalPages] = useState(0);
    const [nowPage, setNowPage] = useState(0);
    const [startPage, setStartPage] = useState(0);
    const count = 5;
    const size = 10;


    const fetchHistory = (pageNumber) => {

        const url = process.env.REACT_APP_API_URL +'/history?page=' + pageNumber+'&size='+size;

        axios.get(url, { headers: { 'Authorization': token } })
            .then(response => {
                setHistories(response.data.contents);
                setNowPage(response.data.pageInfo.nowPage);
                setTotalPages(response.data.pageInfo.totalPages);
            }).catch(error => {
                alert("데이터 불러오기 실패!");
            })
    }

    useEffect(() => {
        fetchHistory(0);
    }, []);

    useEffect(() => {
        setStartPage(Math.floor(nowPage / count) * count);
    }, [nowPage]);


    if (histories.length <= 0) {
        return (
            <section className='my-content'>
                <div className='fs-5 text-secondary d-flex align-items-center justify-content-center h-100'>
                    기록이 없습니다.
                </div>
            </section>
        );
    }

    const pageBtns = () => {

        const result = [];

        for (let i = startPage; i < startPage + count; i++) {

            if (i >= totalPages) break;
            result.push(
                <Pagination.Item key={i} className={i === nowPage ? 'active' : ''} onClick={()=>fetchHistory(i)}>
                    {i + 1}
                </Pagination.Item>
            )
        }

        return result;
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
                                        {history.title}
                                    </div>
                                    <div className='text-secondary'>판매번호 #{history.id}</div>
                                    <div className='text-secondary'>
                                        {history.date}
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-end'>
                                    <div className='fw-semibold fs-5'>
                                        {history.price.toLocaleString('ko-KR')}원
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </ListGroup.Item>

                ))}

            </ListGroup>

            <Pagination variant="success" className='mt-4 justify-content-center gap-1 my-pagination'>
                {startPage > 0 && <Pagination.Prev onClick={()=>fetchHistory(startPage-1)}/>}
                {pageBtns()}
                {startPage + 5 < totalPages && <Pagination.Next  onClick={()=>fetchHistory(startPage+5)}/>}
            </Pagination>

        </div>
    );
}

export default HistoryView;
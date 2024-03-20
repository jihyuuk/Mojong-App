import React, { useEffect, useState } from 'react';
import { ListGroup, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ServerApi from '../../server/ServerApi';
import { useToken } from '../../custom/provider/TokenContext';

function AllHistoryView() {

    const [histories, setHistories] = useState([]);

    const { token, removeToken, updateToken } = useToken();

    //페이징
    const [totalPages, setTotalPages] = useState(0);
    const [nowPage, setNowPage] = useState(0);
    const [startPage, setStartPage] = useState(0);
    const count = 5;
    const size = 10;

    const fetchHistory = (pageNumber) => {
        ServerApi('get', '/allHistory?page=' + pageNumber+'&size='+size, null, token, removeToken, updateToken)
            .then(response => {
                setHistories(response.content);
                setNowPage(response.number);
                setTotalPages(response.totalPages);
                // setIsFirst(response.first);
                // setIsLast(response.last);
            })
            .catch(error => {
                //에러처리
                alert("데이터 불러오기 실패, 관리자에게 문의하세요")
                console.error(error);
            })
    }

    useEffect(() => {
        fetchHistory(0);
    }, []);

    useEffect(() => {
        setStartPage(Math.floor(nowPage / count) * count);
        console.log('nowPage : ' + nowPage)
        console.log('count ' + count)
        console.log('startPgae : ' + (Math.floor(nowPage / count) * count))
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

                {histories.map((history, index) => (

                    <ListGroup.Item key={index}>
                        <Link to={`/sale/${history.id}?fromAll=true`}>

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



            <Pagination variant="success" className='mt-4 justify-content-center gap-1 my-pagination'>
                {startPage > 0 && <Pagination.Prev onClick={()=>fetchHistory(startPage-1)}/>}
                {pageBtns()}
                {startPage + 5 < totalPages && <Pagination.Next  onClick={()=>fetchHistory(startPage+5)}/>}
            </Pagination>


        </div>
    );
}

export default AllHistoryView;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useToken } from '../../custom/provider/TokenContext';

function SaleDetailView() {

    const { id } = useParams();

    const { token } = useToken();

    const [sale, setSale] = useState();
    const [saleItems, setSaleItems] = useState([]);

    //영수증 인쇄
    const [printLoading, setPrintLoading] = useState(false);

    //서버연동
    const fetchDetail = () => {

        axios.get(process.env.REACT_APP_API_URL +'/sale/'+id, { headers: { 'Authorization': token } })
        .then(response => {
            setSale(response.data.sale);
            setSaleItems(response.data.saleItems);
        }).catch(error => {
            alert("데이터 불러오기 실패!");
        })
    
    }

    //영수증 출력
    const printReceipt = () => {
        setPrintLoading(true);

        axios.get(process.env.REACT_APP_API_URL + '/receipt/'+id , { headers: { 'Authorization': token } })
        .then(response => {
            alert("출력 성공!");
        }).catch(error => {

            if(error.response && error.response.status === 503){
                alert('프린터가 연결되어 있지 않습니다.');
                return;
            }

            alert("영수증 출력 실패!\n 관리자에게 문의하세요");
        }).finally(()=>{
            setPrintLoading(false);
        })
    }

    //처음 로딩시 데이터 불러오기
    useEffect(() => {
        fetchDetail();
    }, []);

    if (!sale) {
        return (
            <section className='my-content'>
                <div className='fs-4 text-secondary d-flex align-items-center justify-content-center h-100'>
                    <div className='text-center'>
                        <span>존재하지 않거나, 열람하실 수 없습니다.</span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <div className='my-content bg-white'>
            <ListGroup className='fw-medium'>

                {/* 판매내역 */}
                <ListGroupItem>
                    <div className='fw-semibold text-success fs-5 mb-2'>판매번호 #{id}</div>

                    {/* 금액 부분 */}
                    <div className='border border-success-subtle p-3 rounded-3'>
                        {saleItems.map((item, index) => (
                            <div key={index} className='d-flex flex-wrap mt-1'>
                                <div>
                                    {index + 1}. {item.name} - {item.price.toLocaleString('ko-KR')} x {item.quantity}
                                </div>
                                <div  className='ms-auto'>
                                    {item.total.toLocaleString('ko-KR')}원
                                </div>
                            </div>
                        ))}

                        <hr />

                        {sale.salePrice > 0 &&
                            <>
                                <div className='d-flex justify-content-between'>
                                    <div className='text-secondary'>
                                        합계금액
                                    </div>
                                    <div>
                                        <div>{sale.totalPrice.toLocaleString('ko-KR')}원</div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between mt-1'>
                                    <div className='text-secondary'>
                                        할인
                                    </div>
                                    <div className={`${sale.salePrice > 0 ? 'text-danger' : 'text-secondary'}`}>
                                        -{sale.salePrice.toLocaleString('ko-KR')}원
                                    </div>
                                </div>

                                <hr />

                            </>
                        }



                        <div className={`d-flex justify-content-between fw-semibold fs-4`}>
                            <div>
                                계산 금액
                            </div>
                            <div>
                                {sale.finalPrice.toLocaleString('ko-KR')}원
                            </div>
                        </div>
                    </div>
                </ListGroupItem>

                {/* 결제일시 */}
                <ListGroupItem>
                    <div className='fw-semibold text-success fs-5 mb-2'>결제일시</div>
                    <div className='ps-1'>{sale.createdDate}</div>
                </ListGroupItem>

                {/* 판매자 */}
                <ListGroupItem>
                    <div className='fw-semibold text-success fs-5 mb-2'>판매자</div>
                    <div className='ps-1'>{sale.username}</div>
                </ListGroupItem>

                {/* 결제수단 */}
                <ListGroupItem>
                    <div className='fw-semibold text-success fs-5 mb-2'>결제수단</div>
                    {/* 여기 수정 필요 */}
                    <div className='ps-1'>{sale.pay === 'card' ? '카드' : '현금'}</div>
                </ListGroupItem>
            </ListGroup>
            <div className='text-center py-4 bg-white'>
                <Button variant='outline-success' className='fw-semibold fs-5 py-2 px-5 rounded-5' disabled={printLoading}  onClick={()=>printReceipt()}>
                    {printLoading ?
                        <>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status" className='ms-2'>출력중...</span>
                        </>
                        :
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-printer me-2" viewBox="0 0 16 16">
                                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
                            </svg>
                            인쇄하기
                        </>
                    }


                </Button>
            </div>

        </div>
    );
}

export default SaleDetailView;
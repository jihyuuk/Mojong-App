import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TokenContext, TotalPrice } from '../../App';
import axios from 'axios';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ServerApi from '../../server/ServerApi';
import { useToken } from '../../custom/provider/TokenContext';

function SaleDetailView() {

    const { id } = useParams();

    const [sale, setSale] = useState();
    const [saleItems, setSaleItems] = useState([]);
    const {token, removeToken, updateToken} = useToken();

    //서버연동
    const fetchDetail = () => {
        ServerApi('get', '/sale/' + id, null, token, removeToken, updateToken)
            .then(response => {
                setSale(response.sale);
                setSaleItems(response.saleItems);
            })
            .catch(error => {
                //에러 처리
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
                        <span>존재하지 않거나, 권한이 없습니다.</span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <div className='my-content pb-0'>
            <ListGroup className='fw-medium'>

                {/* 판매내역 */}
                <ListGroupItem>
                    <div className='fw-semibold text-success fs-5 mb-2'>판매번호 #{id}</div>

                    {/* 금액 부분 */}
                    <div className='border border-success-subtle p-3 rounded-3'>
                        {saleItems.map((item, index) => (
                            <div key={index} className='d-flex justify-content-between'>
                                <div>
                                    {index + 1}. {item.name} x {item.quantity}
                                </div>
                                <div>
                                    {item.total.toLocaleString('ko-KR')}원
                                </div>
                            </div>
                        ))}

                        <hr />

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
                <Button variant='outline-success' className='fw-semibold fs-5 py-2 px-5 rounded-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-printer me-2" viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
                    </svg>
                    인쇄하기
                </Button>
            </div>

        </div>
    );
}

export default SaleDetailView;
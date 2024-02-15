import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TokenContext, TotalPrice } from '../../App';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import SubHeader from '../subHeader/SubHeader';

function SaleDetailView() {

    const [loading, setLoading] = useState(false);
    const { token, setToken } = useContext(TokenContext);
    const { id } = useParams();

    const [sale, setSale] = useState();
    const [saleItems, setSaleItems] = useState([]);

    const fetchDetail = async () => {

        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/sale/' + id,
                {
                    headers: {
                        'Authorization': token,
                    }
                });

            if (response.status === 200) {
                //데이터 불러오기성공시
                setSale(response.data.sale);
                setSaleItems(response.data.saleItems);
            } else if (response.status === 201) {
                //토큰갱신
                const newToken = response.headers.get('Authorization');
                localStorage.setItem('jwtToken', newToken);
                setToken(newToken);

                console.log("토큰이 갱신되었습니다.");

                //데이터 불러오기성공시
                setSale(response.data.sale);
                setSaleItems(response.data.saleItems);
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

    //처음 로딩시 데이터 불러오기
    useEffect(() => {
        setLoading(true);
        fetchDetail();
    }, []);

    if (!sale) {
        return (
            <div>
                존재하지 않는 판매번호 입니다.
            </div>
        )
    }

    return (
        <div className='my-content'>
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
                                    {item.total}원
                                </div>
                            </div>
                        ))}

                        <hr />

                        <div className='d-flex justify-content-between'>
                            <div className='text-secondary'>
                                합계금액
                            </div>
                            <div>
                                <div>{sale.totalPrice}원</div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-1'>
                            <div className='text-secondary'>
                                할인
                            </div>
                            <div className={`${sale.salePrice > 0 ? 'text-danger' : 'text-secondary'}`}>
                                -{sale.salePrice}원
                            </div>
                        </div>

                        <hr />

                        <div className={`d-flex justify-content-between fw-semibold fs-4`}>
                            <div>
                                계산 금액
                            </div>
                            <div>
                                {sale.finalPrice}원
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
        </div>
    );
}

export default SaleDetailView;
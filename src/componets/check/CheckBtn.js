import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useCart } from '../../custom/provider/CartContext';
import { useToken } from '../../custom/provider/TokenContext';
import axios from 'axios';

function CheckBtn({ props }) {

    const { cart, totalPrice } = useCart();

    const { pay, salePrice, finalPrice, print } = props;

    const { token } = useToken();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('loading');
    const [printSuccess, setPrintSuccess] = useState(true);

    const handleClick = () => {
        setLoading(true);

        //서버 반영
        axios.post(
            process.env.REACT_APP_API_URL + "/sale",
            {
                'items': cart,
                'totalPrice': totalPrice,
                'salePrice': salePrice,
                'finalPrice': finalPrice,
                'pay': pay,
                'print': print
            },
            { headers: { 'Authorization': token } })
            .then(response => {
                //성공
                setSuccess('success');
                setPrintSuccess(true);
            })
            .catch(error => {

                if(error.response && error.response.status === 503){
                    setSuccess('success');
                    setPrintSuccess(false);
                    return;
                }

                //에러처리
                setSuccess('fail');
            })

    }

    //성공적으로 완료후 닫기
    const successClose = () => {
        window.location.replace('/');
    }

    //실패시 닫기
    const failClose = () => {
        setLoading(false);
        setSuccess('loading');
    }


    //정산 로딩중
    if (loading) {
        return (
            <div className='position-absolute h-100 w-100 bg-white p-3 z-2'>

                <div className='text-center mt-2'>
                    {success != 'fail' ?
                        <div class={`circle-loader ${success === 'success' ? 'load-complete' : ''}`}>
                            {success === 'success' && <div class="checkmark draw"></div>}
                        </div>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-exclamation-circle text-danger" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                        </svg>
                    }

                    {success === 'loading' && <div class="fs-1 mt-4 text-secondary fw-medium">결제중 입니다..</div>}
                    {success === 'success' && <div class="fs-1 mt-4 text-success fw-medium">정산완료!</div>}
                    {success === 'fail' && <><div class="fs-1 mt-4 text-danger fw-medium">정산실패</div><div className='mt-1 fw-medium'>관리자에게 문의해주세요.</div></>}
                </div>

                <ListGroup variant="flush" className='border rounded-4 py-2 mt-4 fs-5'>
                    <ListGroup.Item className='d-flex justify-content-between'>
                        <div>결제금액</div>
                        <div className='text-secondary'>{finalPrice.toLocaleString('ko-KR')}원</div>
                    </ListGroup.Item>

                    <ListGroup.Item className='d-flex justify-content-between'>
                        <div>할인금액</div>
                        <div className='text-secondary'>{salePrice.toLocaleString('ko-KR')}원</div>
                    </ListGroup.Item>

                    <ListGroup.Item className='d-flex justify-content-between'>
                        <div>결제수단</div>
                        <div className='text-secondary'>{pay === 'card' ? '카드' : '현금'}</div>
                    </ListGroup.Item>

                    {print && 
                      <ListGroup.Item className='d-flex justify-content-between'>
                          <div>영수증</div>
                          <div className={printSuccess?'text-secondary':'text-danger'}>{printSuccess ? '출력' : '출력실패!'}</div>
                      </ListGroup.Item>
                    }
              
                </ListGroup>

                {success === 'success' &&
                    <div className='position-absolute bottom-0 start-0 w-100 p-3'>
                        <Button variant='success' className='fs-4 fw-semibold w-100' onClick={() => successClose()}>
                            닫기
                        </Button>
                    </div>
                }

                {success === 'fail' &&
                    <div className='position-absolute bottom-0 start-0 w-100 p-3'>
                        <Button variant='secondary' className='fs-4 fw-semibold w-100' onClick={() => failClose()}>
                            취소
                        </Button>
                    </div>
                }

            </div>

        );
    }

    return (
        <div className='bg-white p-3 border-top'>
            <Button variant='success' className='w-100 fs-4 fw-semibold' disabled={finalPrice <= 0} onClick={() => handleClick()}>정산완료</Button>
        </div>
    );
}

export default CheckBtn;
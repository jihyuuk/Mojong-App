import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useCart } from '../../custom/provider/CartContext';

function AddCartModal(props) {

    const item = props.item;
    const show = props.show;
    const handleClose = props.handleClose;

    //데이터 관련
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    //클리어버튼
    const [showClear, setShowClear] = useState(false);

    //처음 로딩시
    useEffect(() => {
        if (show) {
            setName(item.name);
            setPrice(item.price);
            setQuantity(0);
        }
    }, [show])


    //더하기 버튼
    const handlePlus = (param) => {
        setQuantity(quantity + Number(param));
    }

    //장바구니 담기 클릭시
    const { addCart } = useCart();
    const handleAddCart = () => {
        addCart(name, price, quantity)
            &&
            handleClose();
    }


    //onChange
    const quantityChange = (value) => {
        //빈값시 0으로 치환
        if (value === '') {
            value = '0';
        }

        //숫자인지, 3자리 이하인지 판별
        if (isNaN(value)) return;

        setQuantity(parseInt(value));
    }

    //클리어 버튼 클릭시
    const clear = () => {
        setQuantity(0);
    }

    //클리어 버튼 표시 여부
    useEffect(() => {
        if (quantity > 0) {
            setShowClear(true);
        } else {
            setShowClear(false);
        }
    }, [quantity])


    return (
        <>

            <Modal show={show} onHide={handleClose} backdrop="static">

                {/* 헤더 */}
                <div className='py-2 border-bottom border-success-subtle border-2 text-success'>
                    <div className='text-center fs-2 fw-medium'>
                        {name}
                    </div>
                </div>

                {/* 바디 */}
                <div className='px-3'>


                    <div className='d-flex justify-content-between align-items-center mt-3 py-2 border-bottom'>
                        <div className='fs-5 fw-medium text-secondary'>
                            단가 {price.toLocaleString('ko-KR')}원
                        </div>
                        <div className='fs-4 fw-semibold'>
                            {(price * quantity).toLocaleString('ko-KR')}원
                        </div>
                    </div>


                    <div className='pb-2 mt-3 position-relative d-flex align-items-center'>
                        <span className='position-absolute start-0 ms-2 text-success'>수량</span>
                        <Form.Control
                            id='modal-input'
                            type="text"
                            pattern="\d*"
                            inputMode="numeric"
                            placeholder='0'
                            className='text-center mx-auto fs-4 border-success-subtle'
                            value={quantity === 0 ? '' : quantity}
                            onChange={(e) => quantityChange(e.target.value.trim())}
                            autoFocus
                        />

                        {showClear &&
                            <div className='position-absolute px-2 me-2 end-0 h-75' onClick={() => clear()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x my-auto h-100" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </div>

                        }

                    </div>


                    <div className='my-3'>
                        <div className='d-flex justify-content-center text-success'>
                            <div className='border border-success-subtle rounded-pill py-2 px-3 me-2' onClick={() => handlePlus(5)}>+5</div>
                            <div className='border border-success-subtle rounded-pill py-2 px-3 me-2' onClick={() => handlePlus(10)}>+10</div>
                            <div className='border border-success-subtle rounded-pill py-2 px-3 me-2' onClick={() => handlePlus(50)}>+50</div>
                            <div className='border border-success-subtle rounded-pill py-2 px-3' onClick={() => handlePlus(72)}>+72</div>
                        </div>
                    </div>
                </div>


                {/* 푸터 */}
                <div className='border-top p-3'>
                    <div className='d-flex gap-2'>
                        <Button variant='secondary' className='px-5 fs-5' onClick={() => { handleClose() }}>닫기</Button>
                        <Button variant='success' className='flex-grow-1 fs-5' onClick={() => { handleAddCart() }} disabled={price * quantity <= 0}>장바구니 추가</Button>
                    </div>
                </div>

            </Modal>
        </>
    );

}
export default AddCartModal;
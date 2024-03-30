import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useCart } from "../../custom/provider/CartContext";


function ItemModal(props) {

    const { show, modalItem, handleClose } = props.modal;

    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    //show가 false 일때 초기화 실행
    useEffect(() => {
        if (show) return;
        setQuantity(0);
    }, [show]);

    //수량 변경시 합계 자동으로 구함
    useEffect(() => {
        setTotal(quantity * modalItem.price);
    }, [quantity]);

    //클리어버튼  
    const clear = () => {
        setQuantity(0);
    }

    //빼기버튼
    const remove = () => {
        setQuantity(Math.floor(quantity / 10));
    }

    //더하기
    const add = (number) => {
        setQuantity(quantity + Number(number));
    }

    //숫자키
    const numberClick = (number) => {
        setQuantity(quantity * 10 + Number(number));
    }

    //장바구니 담기 클릭시
    const { addCart } = useCart();
    const handleAddCart = () => {
        addCart(modalItem.name, modalItem.price, quantity);
        handleClose(true);
    }

    return (
        <>
            {show &&
                <div className="position-absolute w-100 h-100 p-2 bg-secondary bg-opacity-50 z-3">
                    <div className='my-container p-2 bg-white rounded-3 m-auto fadeIn' style={{ maxWidth: '500px' }}>

                        <header className='border-success-subtle border-bottom border-2 p-2'>
                            <div className='d-flex align-items-center'>
                                <div className="flex-grow-1">
                                    <div className='fw-bold fs-2'>{modalItem.name}</div>
                                    <div className='fw-medium text-secondary ps-2'>{modalItem.description}</div>
                                </div>
                                <div>
                                    <div className="fs-4 fw-semibold">{modalItem.price.toLocaleString('ko-KR')}원</div>
                                </div>
                            </div>
                        </header >

                        <div className='my-content pb-0 bg-white'>
                            <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                                <div className='display-3 fw-semibold'>{quantity.toLocaleString('ko-KR')}개</div>
                                <div className='mt-3 fw-medium text-secondary'>합계 {total.toLocaleString('ko-KR')}원</div>
                            </div>
                        </div>


                        <Container fluid className='fs-3 fw-semibold text-success mb-3 mt-2'>

                            <Row className='text-center mb-2 fs-6 fw-medium gap-2 px-1'>
                                <Col className='bg-success-subtle rounded-4 py-2' onClick={() => add(1)}>
                                    +1
                                </Col>
                                <Col className='bg-success-subtle rounded-4 py-2' onClick={() => add(5)}>
                                    +5
                                </Col>
                                <Col className='bg-success-subtle rounded-4 py-2' onClick={() => add(10)}>
                                    +10
                                </Col>
                                <Col className='bg-success-subtle rounded-4 py-2' onClick={() => add(50)}>
                                    +50
                                </Col>
                                <Col className='bg-success-subtle rounded-4 py-2' onClick={() => add(72)}>
                                    +72
                                </Col>
                            </Row>

                            <Row className='gap-1 px-2'>
                                <Col className='text-center py-2 border border-success-subtle rounded-3' onClick={() => numberClick(1)}>1</Col>
                                <Col className='text-center py-2 border border-success-subtle rounded-3' onClick={() => numberClick(2)}>2</Col>
                                <Col className='text-center py-2 border border-success-subtle rounded-3' onClick={() => numberClick(3)}>3</Col>
                            </Row>
                            <Row className='mt-1 gap-1 px-2'>
                                <Col className='text-center py-2 border border-success-subtle rounded-3' onClick={() => numberClick(4)}>4</Col>
                                <Col className='text-center py-2 border border-success-subtle rounded-3' onClick={() => numberClick(5)}>5</Col>
                                <Col className='text-center py-2 border border-success-subtle rounded-3' onClick={() => numberClick(6)}>6</Col>
                            </Row>
                            <Row className='mt-1 gap-1 px-2'>
                                <Col className='text-center py-2 border border-success-subtle rounded-3' onClick={() => numberClick(7)}>7</Col>
                                <Col className='text-center py-2 border border-success-subtle rounded-3' onClick={() => numberClick(8)}>8</Col>
                                <Col className='text-center py-2 border border-success-subtle rounded-3' onClick={() => numberClick(9)}>9</Col>
                            </Row>
                            <Row className='mt-1 gap-1 px-2'>
                                <Col className='text-center py-2 text-secondary border rounded-4' onClick={() => clear()}>C</Col>
                                <Col className='text-center py-2 border rounded-3 border-success-subtle' onClick={() => numberClick(0)}>0</Col>
                                <Col className='text-center py-2 text-secondary border rounded-4' onClick={() => remove()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
                                        <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                                        <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                                    </svg>
                                </Col>
                            </Row>
                        </Container>

                        <footer className='d-flex'>
                            <Button variant='secondary' className='fw-medium fs-4 me-1' style={{ width: '40%' }} onClick={() => handleClose()}>
                                닫기
                            </Button>
                            <Button variant='success' className='fw-medium fs-4 flex-grow-1' disabled={total <= 0} onClick={()=>handleAddCart()}>
                                장바구니 추가
                            </Button>
                        </footer>

                    </div>
                </div>
            }
        </>
    );

}

export default ItemModal;
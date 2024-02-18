import React, { useState } from 'react';
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../../custom/provider/CartContext';

function CartView() {

    //장바구니관련
    const { cart, removeCart } = useCart();

    //삭제버튼클릭시
    const deleteItem = (deleteItem) => {
        //경고창 띄우기
        removeCart(deleteItem);
    }

    //더하기 버튼
    const handlePlus = (itemPlus) => {
        // const findIdx = cart.findIndex(item => item.name === itemPlus.name)
        // const copy = [...cart];
        // copy[findIdx].quantity += 1;
        // setCart(copy);
    }

    //빼기버튼
    const handleMinus = (itemMinus) => {
        // if (itemMinus.quantity <= 1) return;

        // const findIdx = cart.findIndex(item => item.name === itemMinus.name)
        // const copy = [...cart];
        // copy[findIdx].quantity -= 1;
        // setCart(copy);
    }

    if (cart.length <= 0) {
        return (
            <section className='my-content'>
                <div className='fs-4 text-secondary d-flex align-items-center justify-content-center h-100'>
                    <div className='text-center'>
                        <span>비어있습니다</span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className='my-content'>
            <ListGroup variant='flush' className='bg-white border'>

                {/* 카테고리의 아이템들 출력 부분*/}
                {cart.map((item, index) => (

                    <ListGroup.Item key={index} className='fs-6 fw-medium py-2 px-3'>

                        <div className='py-1'>
                            {/* 헤더 */}
                            <div className='d-flex align-items-center justify-content-between'>
                                {/* 상품명 */}
                                <span className='fs-5 fw-semibold text-success me-2'>{index + 1}. {item.name}</span>
                                {/* 닫기버튼 */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16" onClick={() => deleteItem(item)}>
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                            </div>

                            {/* 계산 */}
                            <div className='d-flex justify-content-between align-items-end'>

                                {/* 수량버튼 */}
                                <span className='border border-success-subtle rounded-3 p-2 ms-3'>
                                    {/* 빼기 */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16" onClick={() => handleMinus(item)}>
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                    </svg>
                                    {/* 수량 */}
                                    <span className='mx-3'>{item.quantity}</span>
                                    {/* 더하기 */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus m-auto" viewBox="0 0 16 16" onClick={() => handlePlus(item)}>
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                </span>

                                <div className='pt-2'>
                                    {/* 단가 */}
                                    <div className='text-secondary text-end'>단가 {item.price}원</div>
                                    {/* 합계 */}
                                    <div className='' style={{ fontSize: '1.15rem' }}>합계 <span className='fw-semibold'>{item.price * item.quantity}</span>원</div>
                                </div>
                            </div>

                        </div>
                    </ListGroup.Item>

                ))}

                <Link to='/custom-item' className='text-decoration-none' replace={true} >
                    <div className='py-2 fs-5 text-secondary text-center'>
                        + 직접입력하기
                    </div>
                </Link>

            </ListGroup>
        </section>
    );

}

export default CartView;
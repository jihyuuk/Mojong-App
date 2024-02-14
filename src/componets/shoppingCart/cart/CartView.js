import React, { useContext, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { ShoppingCartContext, TotalPrice, TotalQuantity } from '../../../App';
import { Link } from 'react-router-dom';

function CartView() {

    //장바구니관련
    const { cart, setCart } = useContext(ShoppingCartContext);
    const { totalPrice } = useContext(TotalPrice);
    const { totalQuantity } = useContext(TotalQuantity);




    //삭제버튼클릭시
    const deleteItem = (deleteItem) => {
        //경고창 띄우기
        const updateCart = cart.filter(item => item.name !== deleteItem.name);
        setCart(updateCart);
    }

    //더하기 버튼
    const handlePlus = (itemPlus) => {
        const findIdx = cart.findIndex(item => item.name === itemPlus.name)
        const copy = [...cart];
        copy[findIdx].quantity += 1;
        setCart(copy);
    }

    //빼기버튼
    const handleMinus = (itemMinus) => {
        if (itemMinus.quantity <= 1) return;

        const findIdx = cart.findIndex(item => item.name === itemMinus.name)
        const copy = [...cart];
        copy[findIdx].quantity -= 1;
        setCart(copy);
    }


    if (cart.length <= 0) {
        return (
            <section className='my-content'>
                <div className='fs-5 text-secondary d-flex align-items-center justify-content-center h-100'>
                    비어있습니다
                </div>
            </section>
        );
    }

    return (
        <section className='my-content'>
            <div className='p-2 d-flex justify-content-between text-secondary'>
                <div>품목 <span className='fw-semibold'>{cart.length}</span> · 수량 <span className='fw-semibold'>{totalQuantity}</span></div>
                <div>총 합계 <span className='fw-semibold'>{totalPrice}</span>원</div>
            </div>

            <div className='bg-white border shadow-sm'>
                <ListGroup variant='flush'>

                    {/* 카테고리의 아이템들 출력 부분*/}
                    {cart.map((item, index) => (

                        <ListGroup.Item key={index} className='fs-6 fw-medium py-2 px-3'>


                            <div className='py-1'>
                                {/* 헤더 */}
                                <div className='d-flex align-items-center'>

                                    {/* 상품명 */}
                                    <span className='fs-5 fw-semibold text-success me-2'>{index + 1}. {item.name}</span>
                                    {/* 닫기버튼 */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3 text-secondary item" viewBox="0 0 16 16" onClick={()=>deleteItem(item)}>
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>

                                </div>

                                {/* 계산 */}
                                <div className='d-flex justify-content-between align-items-end'>
                                    <div className='pt-2 ps-2 '>
                                        {/* 단가 */}
                                        <div className='text-secondary mt-auto me-3'>단가 {item.price}원</div>
                                        {/* 합계 */}
                                        <div className='' style={{ fontSize: '1.15rem' }}>합계 <span className='fw-semibold'>{item.price * item.quantity}</span>원</div>
                                    </div>


                                    {/* 수량버튼 */}
                                    <span className='border border-success-subtle rounded-3 p-2'>

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
                                </div>




                            </div>
                        </ListGroup.Item>

                    ))}

                </ListGroup>

                <Link to='/custom-item' className='text-decoration-none' replace={true} >
                    <div className='py-2 fs-4 text-secondary text-center border-top'>
                        + 직접입력하기
                    </div>
                </Link>

            </div>
        </section>
    );

}

export default CartView;
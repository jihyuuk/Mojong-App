import React, { useContext, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { ShoppingCartContext, TotalPrice, TotalQuantity } from '../../../App';

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
        copy[findIdx].count += 1;
        setCart(copy);
    }

    //빼기버튼
    const handleMinus = (itemMinus) => {
        if (itemMinus.count <= 1) return;

        const findIdx = cart.findIndex(item => item.name === itemMinus.name)
        const copy = [...cart];
        copy[findIdx].count -= 1;
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

            <div className='bg-white'>
                <ListGroup variant='flush'>

                    {/* 카테고리의 아이템들 출력 부분*/}
                    {cart.map((item, index) => (

                        <ListGroup.Item key={index} className='py-3 fs-6 fw-medium shadow-sm'>

                            {/* 헤더 */}
                            <div className='d-flex align-items-center justify-content-between'>
                                {/* 상품명 */}
                                <span className='fs-5 fw-semibold'>{index + 1}. {item.name}</span>
                                {/* 닫기버튼 */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" onClick={() => deleteItem(item)}>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </div>

                            {/* 합계 */}
                            <div className='p-1 py-3'>총 합계 : <span className='fw-semibold'>{item.price * item.count}</span>원 </div>

                            {/* 수량버튼 */}
                            <div className='text-center'>
                                <span className='border rounded-3 p-2'>
                                    {/* 감소버튼 */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16" onClick={() => handleMinus(item)}>
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                    </svg>
                                    {/* 수량 */}
                                    <span className='mx-3'>{item.count}</span>
                                    {/* 증가버튼 */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus m-auto" viewBox="0 0 16 16" onClick={() => handlePlus(item)}>
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                </span>
                            </div>

                        </ListGroup.Item>

                    ))}

                </ListGroup>

            </div>
        </section>
    );

}

export default CartView;
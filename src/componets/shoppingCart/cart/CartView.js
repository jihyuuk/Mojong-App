import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { ShoppingCartContext } from '../../../App';

function CartView(props) {

    const { cart, setCart } = useContext(ShoppingCartContext);
    const total = props.total;
    const totalQuantity = props.totalQuantity;


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
        const findIdx = cart.findIndex(item => item.name === itemMinus.name)
        const copy = [...cart];
        copy[findIdx].count -= 1;
        setCart(copy);
    }


    if(cart.length <= 0){
        return(
        <div className='fs-5 text-secondary h-100 d-flex align-items-center justify-content-center' >
            비어있습니다
        </div>
        );
    }

    return (
                <div className='bg-white'>
                    <ListGroup variant='flush'>

                        {/* 카테고리의 아이템들 출력 부분*/}
                        {cart.map((item, index) => (

                            <ListGroup.Item key={index} className='fs-5 fw-semibold py-3 item'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    {/* 상품명 */}
                                    <span className='m-0 me-2'>{index + 1}. {item.name}</span>
                                    {/* 닫기버튼 */}
                                    <Button variant='default' onClick={() => deleteItem(item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </Button>
                                </div>
                                <p className='fs-6 fw-medium p-1 mb-0'>단가 : {item.price}원 </p>
                                <p className='fw-bold p-1'>합계 : {item.price * item.count}원 </p>

                                {/* 수량 */}
                                <div className='d-flex justify-content-center gap-2'>
                                    {/* 감소버튼 */}
                                    <Button variant='default' className='border' onClick={() => handleMinus(item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                        </svg>
                                    </Button>

                                    <Form.Control
                                        id="AddCartInput"
                                        className='text-center p-0 bg-white'
                                        type="number"
                                        pattern="\d*"
                                        min="0"
                                        inputMode="numeric"
                                        placeholder='0'
                                        value={item.count}
                                        readOnly
                                        disabled
                                    />

                                    {/* 증가버튼 */}
                                    <Button variant='default' className='border' onClick={() => handlePlus(item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                        </svg>
                                    </Button>
                                </div>

                            </ListGroup.Item>

                        ))}

                    </ListGroup>
                    <hr />

                    <p className='ps-3 fs-6 mb-1'>항목 : {cart.length}개</p>
                    <p className='ps-3 fs-6'>총 수량 : {totalQuantity}개</p>

                    <hr />

                    <p className='ps-3 fw-bold fs-5'>총 합계 : {total}원</p>

                    <hr />

                </div>
    );

}

export default CartView;
import React, { useState } from 'react';
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../customProvider/CartContext';

function CartView() {

    //장바구니관련
    const { cart, removeCart, totalPrice, totalQuantity, saleInput, saleInputChange, saleCondition, saleConditionChange, salePrice, removeSale, finalPrice } = useCart();
    const [showSale, setShowSale] = useState(salePrice > 0);

    const handleShow = () => {
        if(showSale){
            saleInputChange(0);
        }
        setShowSale(!showSale);
    }

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

    //할인 버튼
    const saleclick = () => {
        ;
    }

    if (cart.length <= 0) {
        return (
            <section className='my-content'>
                <div className='fs-4 text-secondary d-flex align-items-center justify-content-center h-100'>
                    <div className='text-center'>
                        <span>비어있습니다</span>
                        <Link to='/custom-item' className='text-decoration-none' replace={true} >
                            <div className='py-2 px-3 fs-6 fw-medium mt-3 text-secondary text-center border rounded-5'>
                                + 직접입력
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className='my-content'>
            {/* <div className='p-2 d-flex justify-content-between text-secondary'>
                <div>품목 <span className='fw-semibold'>{cart.length}</span> · 수량 <span className='fw-semibold'>{totalQuantity}</span></div>
                <div>총 합계 <span className='fw-semibold'>{totalPrice}</span>원</div>
            </div> */}

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

            {/* 할인부분 */}
            <div className='bg-white fw-medium mt-3 p-3 border'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='fw-semibold fs-5'>
                        할인
                    </div>

                    <div className='d-flex fw-semibold bg-white text-nowrap text-secondary'>
                        <div className={`py-2 px-3 w-50 rounded-start ${!showSale ? 'checked' : 'border'}`} onClick={() => handleShow()}>
                            <span>없음</span>
                        </div>
                        <div className={`py-2 px-3 w-50 rounded-end  ${showSale ? 'checked' : 'border'}`} onClick={() => handleShow()}>
                            <span>입력</span>
                        </div>
                    </div>
                </div>

                {showSale &&
                    <div className='mt-4'>
                        <InputGroup>
                            <Form.Control size='lg' className='text-end' placeholder="0" type="number" pattern="\d*" value={saleInput === 0 ? '' : saleInput} onChange={(e) => saleInputChange(e.target.value.trim())} />
                            <Button variant={`${saleCondition === 'won' ? 'success' : 'outline-secondary'}`} className='px-3' onClick={() => saleConditionChange()}>원</Button>
                            <Button variant={`${saleCondition === 'percent' ? 'success' : 'outline-secondary'}`} className='px-3' onClick={() => saleConditionChange()}>%</Button>
                        </InputGroup>
                    </div>
                }
            </div>


            {/* 금액 부분 */}
            <div className='bg-white fw-medium mt-3 p-3 border' style={{ fontSize: '1.15rem' }}>
                <div className='d-flex justify-content-between'>
                    <div className='text-secondary'>
                        합계금액
                    </div>
                    <div>
                        <div>{totalPrice}원</div>
                    </div>
                </div>
                <div className='d-flex justify-content-between mt-1'>
                    <div className='text-secondary'>
                        할인 {saleCondition === 'percent' && saleInput > 0 && <span className='text-danger'>({saleInput}%)</span>}
                    </div>
                    <div className={`${salePrice > 0 ? 'text-danger' : 'text-secondary'}`}>
                        - {salePrice}원
                    </div>
                </div>

                <hr />

                <div className={`d-flex justify-content-between fw-semibold fs-4 ${finalPrice <= 0 ? 'text-danger' : ''}`}>
                    <div>
                        계산 금액
                    </div>
                    <div>
                        {finalPrice}원
                    </div>
                </div>
            </div>

        </section>
    );

}

export default CartView;
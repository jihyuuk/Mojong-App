import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartView from './cart/CartView';
import ReceiptView from '../receipt/receipt/ReceiptView';
import { ShoppingCartContext } from '../../App';
import Footer from '../footer/Footer';

function ShoppingCart() {

    //장바구니관련
    const { cart } = useContext(ShoppingCartContext);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    // cart이 변경될 때마다 총합을 계산
    useEffect(() => {
        let calculatedTotal = 0;
        let quantityTotal = 0;

        cart.forEach(item => {
            // 장바구니 아이템 순회하면서 총합 계산
            calculatedTotal += (Number(item.price) * Number(item.count));
            //총 수량 개산
            quantityTotal += item.count;
        });

        // 총합 업데이트
        setTotal(calculatedTotal);
        setTotalQuantity(quantityTotal);
    }, [cart]);


    return (
        <div className='bg-white h-100 d-flex flex-column'>

            {/* 헤더 */}
            <header className='border-bottom bg-white fw-bold fs-3 p-3 d-flex'>
                {/* 뒤로가기 아이콘*/}
                <Link to="/" replace={true} className='d-flex align-items-center text-secondary'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                </Link>

                <p className='ms-3 mb-0'>장바구니</p>
            </header>

            {/* 콘텐츠 영역 */}
            <div className='overflow-auto h-100 bg-info'>
                {/* 내용 */}
                <CartView totalQuantity={totalQuantity} total={total} />
            </div>

            <Footer value={'cart'}></Footer>
        </div>
    );
}

export default ShoppingCart;
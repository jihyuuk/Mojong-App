import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartView from './cart/CartView';

function ShoppingCart() {

    return (
        <div className='bg-white'>


            {/* 헤더 */}
            <header className='border-bottom sticky-top bg-white fw-bold fs-3 p-2 d-flex align-items-center'>
                {/* 뒤로가기 아이콘*/}
                <Link to="/">
                    <Button variant="default" className='fw-bold'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                        </svg>
                    </Button>
                </Link>

                <p className='ms-3 mb-0'>장바구니</p>
            </header>

            {/* 장바구니, 영수증 버튼 */}
            <Container fluid className='border-bottom'>
                <Row>
                    <Col className='text-center py-2 '>
                        <span className='text-center'>장바구니</span>
                    </Col>
                    <Col className="col-auto border p-0">
                    </Col>
                    <Col  className='text-center py-2  fw-bold border-bottom border-dark border-3'>
                        <span className='text-center'>영수증 미리보기</span>
                    </Col>
                </Row>
            </Container>


            {/* 내용 */}
            <CartView></CartView>

        </div>
    );
}

export default ShoppingCart;
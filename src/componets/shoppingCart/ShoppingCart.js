import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ShoppingCart() {
    return (
        <div>

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

            {/* 바디 */}
            <div className='fs-5 text-secondary' style={{ width: '100%', height: '25em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                비어있습니다
            </div>

        </div>
    );
}

export default ShoppingCart;
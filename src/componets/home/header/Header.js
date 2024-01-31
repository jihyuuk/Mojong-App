import React from 'react';
import { Badge, Button, Form } from 'react-bootstrap';
import HamburgerBtn from './HambergurBtn';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className='border-bottom'>
            <div className="py-2 d-flex">

                {/* 햄버거 버튼 */}
                <HamburgerBtn></HamburgerBtn>
                {/* 검색창 */}
                <Form.Control size="lg" type="text" className='flex-grow-1 px-2' placeholder="🔍 검색하기" />

                {/* 장바구니 아이콘 */}
                <Link to="/shopping-cart">
                    <Button variant="default" className='position-relative'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                        </svg>
                        {/* 수량 벳지 */}

                        <div className='z-1 position-absolute top-0 start-50'>
                            <Badge pill bg="danger">3</Badge>
                        </div>
                    </Button>
                </Link>
            </div>
        </header>
    );
}

export default Header;
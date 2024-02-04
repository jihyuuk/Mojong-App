import React, { useContext, useState } from 'react';
import { Badge, Button, Form } from 'react-bootstrap';
import HamburgerBtn from './HambergurBtn';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../../App';
import SearchField from '../search/SearchField';
import Category from '../category/Category';

function Header() {

    const { cart } = useContext(ShoppingCartContext);
    const [input, setInput] = useState('');

    const handleInput = (e) => {
        const value = e.target.value.trim();
        setInput(value);
    }

    return (
        <div className='sticky-top bg-white '>
            <header>
                <div className="py-2 d-flex border-bottom">

                    {/* 햄버거 버튼 */}
                    <HamburgerBtn></HamburgerBtn>
                    {/* 검색창 */}
                    <Form.Control size="lg" type="search" className='flex-grow-1 px-2' placeholder="🔍 검색하기" onInput={handleInput}/>

                    {/* 장바구니 아이콘 */}
                    <Link to="/shopping-cart" replace={true}>
                        <Button variant="default" className='position-relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                            </svg>


                            {/* 수량 벳지 */}
                            {cart.length !== 0 &&
                                <div className='z-1 position-absolute top-0 start-50'>
                                    <Badge bg="danger" className='rounded-circle'>{cart.length}</Badge>
                                </div>
                            }
                        </Button>
                    </Link>
                </div>

                <div className='position-relative'>
                    <SearchField input={input}></SearchField>
                    {/* 카테고리 */}
                    <Category></Category>
                </div>
            </header>

        </div>
    );
}

export default Header;
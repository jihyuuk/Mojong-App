import React, { useContext, useState } from 'react';
import { Badge, Button, Form } from 'react-bootstrap';
import HamburgerBtn from './HambergurBtn';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../../App';
import SearchField from '../search/SearchField';
import Category from '../category/Category';

function Header() {

    const { cart } = useContext(ShoppingCartContext);

    //검색창 관련
    const [input, setInput] = useState('');
    const [clearBtn, setClearBtn] = useState(false);

    //다른 곳 클릭시 연관 검색어 안보이게 하기
    const [show, setShow] = useState(true);

    const handleInput = (e) => {
        const value = e.target.value.trim();

        //값이 있으면 클리어버튼 보여주기
        if(value.length > 0){
            setClearBtn(true);
        } 
        setInput(value);
    }

    //클리어 버튼 클릭시
    const handleClear = () => {
        setInput('');
        setClearBtn(false);
    }

    return (
        <div className='sticky-top bg-white '>
            <header>
                <div className="py-2 d-flex border-bottom">

                    {/* 햄버거 버튼 */}
                    <HamburgerBtn></HamburgerBtn>
                    {/* 검색창 */}
                    <div className='flex-grow-1 position-relative d-flex align-items-center' >
                        <Form.Control size="lg" id='searchBar' type="text" className='pe-5' placeholder="🔍 검색하기" onInput={handleInput} value={input} onClick={() => setShow(true)} />
                        {clearBtn &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x  position-absolute end-0 me-2 h-100" viewBox="0 0 16 16" onClick={handleClear}>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                        }
                    </div>

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
                    {/* 연관검색어 */}
                    <SearchField input={input} setShow={setShow} show={show}></SearchField>
                    {/* 카테고리 */}
                    <Category></Category>
                </div>
            </header>

        </div>
    );
}

export default Header;
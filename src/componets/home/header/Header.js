import React, { useContext, useEffect, useState } from 'react';
import { Badge, Form } from 'react-bootstrap';
import SearchField from '../search/SearchField';
import HamburgerBtn from '../../common/HambergurBtn';
import { Link } from 'react-router-dom';
import { useCart } from '../../../custom/provider/CartContext';

function Header(props) {

    //카트 관련
    const { cart } = useCart();

    //검색창 관련
    const { input, setInput } = props.input;
    const [clearBtn, setClearBtn] = useState(false);

    //다른 곳 클릭시 연관 검색어 안보이게 하기
    const [show, setShow] = useState(true);

    const handleInput = (e) => {
        const value = e.target.value.trim();
        setInput(value);
    }

    //클리어 버튼 클릭시
    const handleClear = () => {
        setInput('');
        setClearBtn(false);
    }

    //input에 따라 클리어 버튼 보여줄지 
    useEffect(() => {
        if (input.length > 0) {
            setClearBtn(true);
        } else {
            setClearBtn(false);
        }
    }, [input]);

    return (
        <header>

            {/* 첫째줄 햄버거버튼,검색창 */}
            <div className='position-relative bg-white z-2'>
                <div className="pt-3 pb-2 d-flex align-items-center">

                    {/* 햄버거 버튼 */}
                    <HamburgerBtn></HamburgerBtn>

                    {/* 검색창 */}
                    <div className='flex-grow-1 position-relative d-flex align-items-center'>
                        <Form.Control size="lg" id='searchBar' type="text" className='ps-4 pe-5 rounded-5 border-2 border-success-subtle' placeholder="🔍 검색하기" onInput={handleInput} value={input} onClick={() => setShow(true)} />
                        {/* 클리어버튼 */}
                        {clearBtn &&
                            <div className='position-absolute px-2 me-2 end-0 h-75' onClick={handleClear}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x my-auto h-100" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </div>
                        }
                    </div>

                    {/* 장바구니 */}
                    <div className={`ps-2 ${cart.length > 0 ? 'pe-3' : 'pe-2'}`}>
                        <Link to="/shopping-cart" replace={true}>
                            <div className='position-relative text-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                                </svg>
                                
                                {cart.length > 0 &&
                                    <Badge bg="danger" className='position-absolute top-0 start-50 rounded-5' style={{fontSize:'0.7rem'}}>
                                        {cart.length}
                                    </Badge>
                                }
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 연관검색어 */}
            <SearchField input={input} setInput={setInput} setShow={setShow} show={show} modalShow={props.handleShow}></SearchField>

        </header>
    );
}

export default Header;
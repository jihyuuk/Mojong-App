import React, { useContext, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import SubHeader from '../subHeader/SubHeader';
import { ShoppingCartContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../customProvider/CartContext';

function CustomItem() {

    const { addCart } = useCart();

    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();

    //리다이렉트
    const navigate = useNavigate();

    //추가버튼
    const submit = () => {
        //장바구니에 담기
        addCart(name,price,quantity)
        &&
        //성공시 리다이렉트
        navigate('/shopping-cart', { replace: true });
    }

    return (
        <div className='my-container bg-white'>

            <SubHeader value='직접 입력하기' to='/shopping-cart'></SubHeader>

            <Container>
                <Row className='mt-3'>
                    <Col>
                        <label for='itemName' className='form-label fs-5 fw-medium text-success'>상품명</label>
                        <input type='text' id='itemName' className='form-control py-2' placeholder='상품명을 입력해주세요' value={name}  onChange={(e) => setName(e.target.value)}/>
                    </Col>
                </Row>

                <Row className='mt-1'>
                    <Col className='mt-2'>
                        <span className='rounded-pill border px-2 py-1 me-2' onClick={() => { setName('상품A') }}>
                            상품A
                        </span>
                        <span className='rounded-pill border px-2 py-1 me-2' onClick={() => { setName('상품B') }}>
                            상품B
                        </span>
                        <span className='rounded-pill border px-2 py-1 me-2' onClick={() => { setName('상품C') }}>
                            상품C
                        </span>
                        <span className='rounded-pill border px-2 py-1 me-2' onClick={() => { setName('상품D') }}>
                            상품D
                        </span>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col className=''>
                        <label for='itemName' className='form-label fs-5 fw-medium  text-success'>단가</label>
                        <input type='number' id='itemName' className='form-control py-2' placeholder='0원' pattern="\d*" min="0" inputMode="numeric" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    </Col>
                    <Col>
                        <label for='itemName' className='form-label fs-5 fw-medium  text-success'>수량</label>
                        <input type='number' id='itemName' className='form-control py-2' placeholder='0개' pattern="\d*" min="0" inputMode="numeric" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}/>
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col className='text-center'>
                        <Button variant='success rounded-4 w-100 py-2 fw-semibold' disabled={false} onClick={() => submit()}>추가하기</Button>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default CustomItem;
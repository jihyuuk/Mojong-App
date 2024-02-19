import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import SubHeader from '../common/SubHeader'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../custom/provider/CartContext';

function CustomItem() {

    const { addCart } = useCart();

    //인풋값
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    //검증
    const [isInValidName, setIsInValidName] = useState(false);
    const [isInValidPrice, setIsInValidPrice] = useState(false);
    const [isInValidQuantity, setIsInValidQuantity] = useState(false);
    const [feedbackName, setFeedbackName] = useState();
    const [feedbackPrice, setFeedbackPrice] = useState();
    const [feedbackQuantity, setFeedbackQuantity] = useState();


    //리다이렉트
    const navigate = useNavigate();

    //추가버튼
    const submit = () => {

        //인풋 검증
        if (name === '' || price === '' || quantity === '') {
            if (name === '') {
                setFeedbackName('상품명을 입력해주세요');
                setIsInValidName(true);
            }
            if (price === '') {
                setFeedbackPrice('단가를 입력해주세요')
                setIsInValidPrice(true);
            }
            if (quantity === '') {
                setFeedbackQuantity('수량을 입력해주세요')
                setIsInValidQuantity(true);
            }
            return;
        }
        if(quantity <= 0){
            setFeedbackQuantity('수량은 0 보다 커야합니다.')
            setIsInValidQuantity(true);
        }

        //장바구니에 담기
        addCart(name, price, quantity)
        &&
        //성공시 리다이렉트
        navigate('/shopping-cart', { replace: true });
    }

    const nameChange = (value) => {
        setName(value);
        if(isInValidName) setIsInValidName(false);
    }
    const priceChange = (value) => {
        console.log(value)
        setPrice(value);
        if(isInValidPrice) setIsInValidPrice(false);
    }
    const quantityChange = (value) => {
        if(value === 0){
            setQuantity('')
        }else{
            setQuantity(value);
        }
        if(isInValidQuantity) setIsInValidQuantity(false);
    }

    return (
        <div className='my-container bg-white'>

            <SubHeader value='직접 입력하기' to='/shopping-cart'></SubHeader>

            <Container>
                <Row className='mt-3'>
                    <Col>
                        <Form.Label className='fs-5 fw-medium text-success'>상품명</Form.Label>
                        <Form.Control type="text" className='py-2' placeholder="상품명을 입력해주세요" value={name} onChange={(e) => nameChange(e.target.value)} isInvalid={isInValidName} />
                        <Form.Control.Feedback type="invalid" className='text-start'>{feedbackName}</Form.Control.Feedback>
                    </Col>
                </Row>

                <Row className='mt-1'>
                    <Col className='mt-2'>
                        <span className='rounded-pill border px-2 py-1 me-2' onClick={() => { nameChange('상품A') }}>
                            상품A
                        </span>
                        <span className='rounded-pill border px-2 py-1 me-2' onClick={() => { nameChange('상품B') }}>
                            상품B
                        </span>
                        <span className='rounded-pill border px-2 py-1 me-2' onClick={() => { nameChange('상품C') }}>
                            상품C
                        </span>
                        <span className='rounded-pill border px-2 py-1 me-2' onClick={() => { nameChange('상품D') }}>
                            상품D
                        </span>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col className=''>
                        <Form.Label className='fs-5 fw-medium  text-success'>단가</Form.Label>
                        <Form.Control type="number" className='py-2' placeholder="0원"  pattern="\d*" min="0" inputMode="numeric" value={price} onChange={(e) => priceChange(Number(e.target.value))} isInvalid={isInValidPrice} />
                        <Form.Control.Feedback type="invalid" className='text-start'>{feedbackPrice}</Form.Control.Feedback>
                    </Col>
                    <Col>
                        <Form.Label className='fs-5 fw-medium  text-success'>수량</Form.Label>
                        <Form.Control type="number" className='py-2' placeholder="0개"  pattern="\d*" min="0" inputMode="numeric" value={quantity} onChange={(e) => quantityChange(Number(e.target.value))} isInvalid={isInValidQuantity} />
                        <Form.Control.Feedback type="invalid" className='text-start'>{feedbackQuantity}</Form.Control.Feedback>
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
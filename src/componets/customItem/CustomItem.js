import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import SubHeader from '../common/SubHeader'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../custom/provider/CartContext';

function CustomItem() {

    const { addCart } = useCart();

    //뒤로가기
    const [params] = useSearchParams();
    const fromHome = params.get('fromHome');

    //인풋값
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        setTotal(price*quantity);
    },[price, quantity]);

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
        if (quantity <= 0) {
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
        if (isInValidName) setIsInValidName(false);
    }
    const priceChange = (value) => {
        console.log(value)
        setPrice(value);
        if (isInValidPrice) setIsInValidPrice(false);
    }
    const quantityChange = (value) => {
        if (value === 0) {
            setQuantity('')
        } else {
            setQuantity(value);
        }
        if (isInValidQuantity) setIsInValidQuantity(false);
    }

 

    return (
        <div className='my-container bg-white'>

            <SubHeader value='직접 입력하기' to={ fromHome ? '/' :'/shopping-cart'}></SubHeader>

            <div className='my-content p-3'>

                <div>
                    <Form.Label className='fs-5 fw-medium text-success'>상품명</Form.Label>
                    <Form.Control type="text" className='py-2' placeholder="상품명을 입력해주세요" value={name} onChange={(e) => nameChange(e.target.value)} isInvalid={isInValidName} />
                    <Form.Control.Feedback type="invalid" className='text-start'>{feedbackName}</Form.Control.Feedback>
                </div>

                <div className='mt-3'>
                    <Form.Label className='fs-5 fw-medium  text-success'>수량</Form.Label>
                    <Form.Control type="number" className='py-2' placeholder="0개" pattern="\d*" min="0" inputMode="numeric" value={quantity} onChange={(e) => quantityChange(Number(e.target.value))} isInvalid={isInValidQuantity} />
                    <Form.Control.Feedback type="invalid" className='text-start'>{feedbackQuantity}</Form.Control.Feedback>
                </div>

                <div className='mt-3'>
                    <Form.Label className='fs-5 fw-medium  text-success'>단가</Form.Label>
                    <Form.Control type="number" className='py-2' placeholder="0원" pattern="\d*" min="0" inputMode="numeric" value={price} onChange={(e) => priceChange(Number(e.target.value))} isInvalid={isInValidPrice} />
                    <Form.Control.Feedback type="invalid" className='text-start'>{feedbackPrice}</Form.Control.Feedback>
                </div>
            </div>

            <div className='p-2 border-top bg-white'>
                <Button variant='success fs-5 fw-semibold p-2 rounded-3 w-100' disabled={total <= 0} onClick={() => submit()}>
                    {(total).toLocaleString('ko-KR')}원 · 추가하기
                </Button>
            </div>

        </div>
    );
}

export default CustomItem;
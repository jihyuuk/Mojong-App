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
    const itemName = params.get('itemName');

    //인풋값
    const [name, setName] = useState(itemName ? itemName : '');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(price * quantity);
    }, [price, quantity]);

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
        if (price <= 0) {
            setFeedbackPrice('단가는 0 보다 커야합니다.')
            setIsInValidPrice(true);
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

    const quantityChange = (value) => {

        setIsInValidQuantity(false);

        if (!value) {
            setQuantity(0);
            return;
        }

        if (!isNaN(value)) {
            setQuantity(Number(value));
        }
    }

    const priceChange = (value) => {

        setIsInValidPrice(false);

        //빈값
        if (!value) {
            setPrice(0);
            return;
        }

        const number = value.replace(/,/g, '');
        //숫자일때만 적용
        if (!isNaN(number)) {
            setPrice(Number(number));
        }
    }




    return (
        <div className='my-container bg-white'>

            <SubHeader value='직접 입력하기' to={fromHome ? '/' : '/shopping-cart'}></SubHeader>

            <div className='my-content p-3'>

                <div>
                    <Form.Label className='fs-5 fw-medium text-success'>상품명</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="상품명을 입력해주세요" value={name} onChange={(e) => nameChange(e.target.value)} isInvalid={isInValidName} />
                    <Form.Control.Feedback type="invalid" className='text-start'>{feedbackName}</Form.Control.Feedback>
                </div>

                <div className='mt-3'>
                    <Form.Label className='fs-5 fw-medium  text-success'>수량</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="0개" pattern="\d*" inputMode="numeric" value={quantity === 0 ? '' : quantity} onChange={(e) => quantityChange(e.target.value)} isInvalid={isInValidQuantity} />
                    <Form.Control.Feedback type="invalid" className='text-start'>{feedbackQuantity}</Form.Control.Feedback>
                </div>

                <div className='mt-3'>
                    <Form.Label className='fs-5 fw-medium  text-success'>단가</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="0원" pattern="\d*" inputMode="numeric" value={price === 0 ? '' : price.toLocaleString('ko-KR')} onChange={(e) => priceChange(e.target.value)} isInvalid={isInValidPrice} />
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
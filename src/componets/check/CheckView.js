import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useCart } from '../../custom/provider/CartContext';
import CheckBtn from './CheckBtn';

function CheckView() {

    //총 합계
    const { totalPrice } = useCart();
    //최종 가격
    const [finalPrice, setFinalPrice] = useState(totalPrice);
    //정산가능
    const [disabled, setDisabled] = useState(false);

    //할인 여부
    const [showSale, setShowSale] = useState(false);
    //결제 수단
    const [pay, setPay] = useState('card');
    //영수증 출력여부
    const [print, setPrint] = useState(false);


    //할인 조건
    const [saleCondition, setSaleCondition] = useState('won');
    //할인 입력
    const [saleInput, setSaleInput] = useState(0);
    //할인 가격
    const [salePrice, setSalePrice] = useState(0);


    //받은금액
    const [getMoney, setGetMoney] = useState(finalPrice);
    //잔돈
    const [change, setChange] = useState(0);

    //잔돈계산
    useEffect(() => {
        const calculate = getMoney - finalPrice;
        setChange(calculate);

        if (calculate < 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [getMoney]);


    //할인 관련========================================================================
    //할인버튼들 핸들
    const saleClick = (value) => {

        if (!value) {
            saleInputChange(0);
        }
        setShowSale(value);
    }

    //할인 조건 변경
    const saleConditionChange = () => {
        //입력값 초기화
        saleInputChange(0);

        if (saleCondition === 'won') {
            setSaleCondition('percent');
        } else {
            setSaleCondition('won');
        }
    }

    //입력값 변경시 할인적용
    const saleInputChange = (value) => {

        if (value <= 0 || value === '') {
            setSaleInput('');
            setSalePrice(0);
            return;
        }

        setSaleInput(value);

        if (saleCondition === 'won') {
            saleWon(value);
        } else {
            salePercent(value);
        }
    }

    //won일때
    const saleWon = (value) => {
        //검증
        setSalePrice(Number(value));
    }

    //percent일때
    const salePercent = (value) => {
        setSalePrice(totalPrice / 100 * value);
    }

    //할인가격 변경시 최종금액 변경됨
    useEffect(() => {
        setFinalPrice(totalPrice - salePrice);
        setGetMoney(totalPrice - salePrice);
    }, [salePrice])
    //할인 관련========================================================================



    return (
        <>
            <div className='my-content px-3'>

                {/* 금액 부분 */}
                <div className='bg-white fw-medium mt-3 p-3 border border-success-subtle rounded-3' >

                    {salePrice > 0 &&
                        <div>
                            <div className='d-flex justify-content-between text-secondary'>
                                <div>
                                    합계금액
                                </div>
                                <div>
                                    <div>{totalPrice.toLocaleString('ko-KR')}원</div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between mt-1'>
                                <div className='text-secondary'>
                                    할인
                                </div>
                                <div className={`${salePrice > 0 ? 'text-danger' : 'text-secondary'}`}>
                                    - {saleCondition === 'percent' ? `${saleInput}% ( ${salePrice.toLocaleString('ko-KR')} )원` : `${salePrice.toLocaleString('ko-KR')}원`}
                                </div>
                            </div>

                            <hr />
                        </div>
                    }

                    <div className={`d-flex justify-content-between align-items-center fw-semibold ${finalPrice <= 0 ? 'text-danger' : ''}`} style={{ fontSize: '1.15rem' }}>
                        <div className='text-success'>
                            결제금액
                        </div>
                        <div className='fs-4'>
                            {finalPrice.toLocaleString('ko-KR')}원
                        </div>
                    </div>
                </div>


                {/* 할인 여부 */}
                <div className='mt-4'>
                    <div className='fs-4'>할인</div>

                    <div className='d-flex mt-2 fs-5 fw-semibold bg-white border text-secondary'>
                        <div className={`py-3 w-100  text-center ${!showSale ? 'checked' : ''}`} onClick={() => saleClick(false)}>
                            <span>없음</span>
                        </div>

                        <div className={`py-3 w-100 text-center ${showSale ? 'checked' : ''}`} onClick={() => saleClick(true)}>
                            <span>입력</span>
                        </div>
                    </div>

                    {showSale &&
                        <div className='mt-2'>
                            <InputGroup>
                                <Form.Control size='lg' className='text-end me-2' placeholder="0" type="number" pattern="\d*" value={saleInput === 0 ? '' : saleInput} onChange={(e) => saleInputChange(e.target.value.trim())} />
                                <Button variant={`${saleCondition === 'won' ? 'success' : 'outline-secondary'}`} className='px-3 fw-semibold' onClick={() => saleConditionChange()}>원</Button>
                                <Button variant={`${saleCondition === 'percent' ? 'success' : 'outline-secondary'}`} className='px-3 fw-semibold' onClick={() => saleConditionChange()}>%</Button>
                            </InputGroup>
                        </div>
                    }
                </div>

                {/* 결제수단 */}
                <div className='mt-4'>
                    <div className='fs-4'>결제수단</div>
                    <div className='d-flex mt-2 fs-4 fw-semibold bg-white border text-secondary'>

                        <div className={`py-3 w-50 text-center ${pay === 'card' ? 'checked' : ''}`} onClick={() => setPay('card')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                            </svg>

                            <div>카드</div>
                        </div>

                        <div div className={`py-3 w-50 text-center ${pay === 'cash' ? 'checked' : ''}`} onClick={() => setPay('cash')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
                                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                            </svg>

                            <div>현금</div>
                        </div>
                    </div>


                    {/* 거스름돈 현금 일때만 보임 */}
                    {pay === 'cash' &&
                        <div div className='p-3 fs-6 mt-2 border rounded-3 bg-light-subtle'>
                            <div className='d-flex align-items-center'>
                                <div className='text-nowrap me-5 text-secondary'>
                                    받은금액
                                </div>
                                <Form.Control className='flex-grow-1 text-end' type="number" pattern="\d*" placeholder="0" value={getMoney} onClick={() => setGetMoney('')} onChange={(e) => setGetMoney(e.target.value.trim())} />
                            </div>
                            <hr />
                            <div className={`d-flex justify-content-between fw-semibold ${change < 0 ? 'text-danger' : ''}`} style={{ fontSize: '1.15rem' }}>
                                <div>
                                    거스름돈
                                </div>
                                <div>
                                    {change.toLocaleString('ko-KR')}원
                                </div>
                            </div>
                        </div>
                    }
                </div>

                {/* 영수증 출력 여부 */}
                <div className='mt-4'>
                    <div className='fs-4'>영수증 출력</div>
                    <div className='d-flex mt-2 fs-5 fw-semibold bg-white border text-secondary'>
                        <div className={`py-3 w-50 text-center ${!print ? 'checked' : ''}`} onClick={() => setPrint(false)}>
                            <span>생략</span>
                        </div>

                        <div className={`py-3 w-50 text-center ${print ? 'checked' : ''}`} onClick={() => setPrint(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-receipt-cutoff me-2" viewBox="0 0 16 16">
                                <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5M11.5 4a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                                <path d="M2.354.646a.5.5 0 0 0-.801.13l-.5 1A.5.5 0 0 0 1 2v13H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H15V2a.5.5 0 0 0-.053-.224l-.5-1a.5.5 0 0 0-.8-.13L13 1.293l-.646-.647a.5.5 0 0 0-.708 0L11 1.293l-.646-.647a.5.5 0 0 0-.708 0L9 1.293 8.354.646a.5.5 0 0 0-.708 0L7 1.293 6.354.646a.5.5 0 0 0-.708 0L5 1.293 4.354.646a.5.5 0 0 0-.708 0L3 1.293zm-.217 1.198.51.51a.5.5 0 0 0 .707 0L4 1.707l.646.647a.5.5 0 0 0 .708 0L6 1.707l.646.647a.5.5 0 0 0 .708 0L8 1.707l.646.647a.5.5 0 0 0 .708 0L10 1.707l.646.647a.5.5 0 0 0 .708 0L12 1.707l.646.647a.5.5 0 0 0 .708 0l.509-.51.137.274V15H2V2.118z" />
                            </svg>
                            <span>출력</span>
                        </div>
                    </div>
                </div>

            </div >

            <CheckBtn props={{salePrice,finalPrice,pay,disabled}} ></CheckBtn>
        </>
    );
}

export default CheckView;
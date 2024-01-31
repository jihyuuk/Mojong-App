import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function AddCartModal(props) {

    const item = props.item;
    const show = props.show;
    const handleClose = props.handleClose;

    //데이터 관련
    const [value, setValue] = useState('');
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);


    //처음 로딩시
    useEffect(()=>{
        if(show){
            setName(item.name);
            setPrice(item.price);

        //value변경시 -> count변경 - > total 변경됨
        setValue('');
    }
    },[show])


    //인풋 value 바뀌면 count도 변경
    useEffect(() => {

        if (value == '') {
            setCount(0);
        } else {
            setCount(value);
        }
    }, [value]);

    //갯수 바뀌면 합계 변경
    useEffect(() => {
        setTotal(price * count);
    }, [count]);

    //더하기 버튼
    const handlePlus = (param) => {
        setValue(Number(value + param));
    }
    //빼기버튼
    const handleMinus = () => {
        const newValue = Number(value - 1);

        if (newValue <= 0) {
            setValue('');
        } else {
            setValue(newValue);
        }
    }

    //값 입력
    const handleInput = (e) => {
        const input = parseInt(e.target.value, 0);
        console.log("입력값 : " + input)
        if (isNaN(input) || input <= 0) {
            //백스페이스 또는 0 입력시
            setValue('');
        } else {
            //잘 입력했을시
            setValue(parseInt(input, 0));
        }
    }

    return (
        <>

            <Modal show={show} onHide={handleClose}>

                {/* 헤더 */}
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold ps-3 fs-2'>{name}</Modal.Title>
                </Modal.Header>

                {/* 바디 */}
                <Modal.Body>
                <p className="fs-5 mb-0 text-center"><span className='fw-semibold'>단가</span> : {price}원 X {count}개</p>
                    <hr></hr>
                    <p className='text-center fs-3 fw-bold mb-0'>합계: {total}원 </p>
                    <hr></hr>

                    {/* 수량 */}
                    <div className='d-flex justify-content-center gap-2'>
                        <Button variant='default' className='border' onClick={handleMinus}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                            </svg>
                        </Button>

                        <Form.Control
                            id="AddCartInput"
                            className='text-center p-0'
                            type="number"
                            pattern="\d*"
                            min="0"
                            inputMode="numeric"
                            placeholder='0'
                            value={value}
                            onInput={handleInput}
                            autoFocus
                        />

                        <Button variant='default' className='border' onClick={() => handlePlus(1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                        </Button>
                    </div>

                    {/* 버튼 */}
                    <div className='d-flex justify-content-center gap-3 mt-4'>
                        <Button variant="outline-primary" className='rounded-pill' onClick={() => handlePlus(5)}>+5</Button>
                        <Button variant="outline-primary" className='rounded-pill' onClick={() => handlePlus(10)}>+10</Button>
                        <Button variant="outline-primary" className='rounded-pill' onClick={() => handlePlus(50)}>+50</Button>
                        <Button variant="outline-primary" className='rounded-pill' onClick={() => handlePlus(72)}>+72</Button>
                    </div>


                </Modal.Body>

                {/* 푸터 */}
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} className='m-auto fs-4'>
                        장바구니에 담기
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );

}

export default AddCartModal;
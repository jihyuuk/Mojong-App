import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function AddCartModal(item) {

    //모달 열기,닫기 관련
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //데이터 관련
    const [value, setValue] = useState('');
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const price = 500;

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
    const handlePlus = () => {
        setCount(count + 1);
    }
    //빼기버튼
    const handleMinus = () => {
        if (count <= 0) {
            setCount(0);
            return;
        }
        setCount(count - 1);
    }

    //값 입력
    const handleInput = (e) => {
        const input = parseInt(e.target.value, 0);
        console.log("입력값 : "+input)
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
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>

                {/* 헤더 */}
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold'>칼탄파워</Modal.Title>
                </Modal.Header>

                {/* 바디 */}
                <Modal.Body>
                    <p className='fs-6 mb-0 p-1'>단가 : {price}원</p>
                    <p className='fw-bold p-1 mb-0'>합계 : {total}원 </p>

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

                        <Button variant='default' className='border' onClick={handlePlus}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                        </Button>
                    </div>

                    {/* 버튼 */}
                    <div>
                        <Button></Button>
                    </div>


                </Modal.Body>

                {/* 푸터 */}
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} className='m-auto'>
                        장바구니에 담기
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );

}

export default AddCartModal;
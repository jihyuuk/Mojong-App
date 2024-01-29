import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function AddCartModal() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <p className='fs-6 mb-0 p-1'>단가 : 500원</p>
                    <p className='fw-bold p-1 mb-0'>합계 : 25,000원 </p>

                    <hr></hr>

                    <div className='d-flex justify-content-center gap-2'>
                        <Button variant='default' className='border'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                            </svg>
                        </Button>
                        <Form.Control id="AddCartInput" type="number" pattern="\d*" min="0" inputMode="numeric" value='0' autoFocus size='3' className='text-center' />
                        <Button variant='default' className='border'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                        </Button>
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
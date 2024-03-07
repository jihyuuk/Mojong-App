import React from "react";
import { Button, Col, Container, Row } from 'react-bootstrap';


function TestPage() {

    return (
        <div className='my-container bg-white p-2'>

            <header className='border-success-subtle border-bottom border-2 bg-white p-2'>
                <div className='position-relative'>
                    <div className='text-center fw-bold fs-2'>복합만점</div>
                </div>
            </header >

            <div className='my-content pb-0 position-relative bg-white'>
                <div className='p-2 position-absolute'>
                    <div className='fw-medium text-secondary'>
                        50구 / 청색판
                    </div>
                    <div className='fw-semibold text-success'>
                        단가 500원
                    </div>
                </div>

                <div className='d-flex align-items-center h-100'>
                    <div className='position-relative text-center w-100'>
                        <div className='display-3 fw-semibold'>27개</div>
                        <div className='mt-3 fw-medium text-secondary position-absolute start-50 translate-middle'>합계 27,000원</div>
                    </div>
                </div>

            </div>


            <Container fluid className='fs-3 fw-semibold text-success mb-3 mt-2'>

                <Row className='text-center mb-2 fs-6 fw-medium gap-2 px-1'>
                    <Col className='bg-success-subtle rounded-3 py-2'>
                        +5
                    </Col>
                    <Col className='bg-success-subtle rounded-3 py-2'>
                        +10
                    </Col>
                    <Col className='bg-success-subtle rounded-3 py-2'>
                        +50
                    </Col>
                    <Col className='bg-success-subtle rounded-3 py-2'>
                        +72
                    </Col>
                </Row>

                <Row className='gap-1 px-2'>
                    <Col className='text-center py-2 border border-success-subtle rounded-3'>1</Col>
                    <Col className='text-center py-2 border border-success-subtle rounded-3'>2</Col>
                    <Col className='text-center py-2 border border-success-subtle rounded-3'>3</Col>
                </Row>
                <Row className='mt-1 gap-1 px-2'>
                    <Col className='text-center py-2 border border-success-subtle rounded-3'>4</Col>
                    <Col className='text-center py-2 border border-success-subtle rounded-3'>5</Col>
                    <Col className='text-center py-2 border border-success-subtle rounded-3'>6</Col>
                </Row>
                <Row className='mt-1 gap-1 px-2'>
                    <Col className='text-center py-2 border border-success-subtle rounded-3'>7</Col>
                    <Col className='text-center py-2 border border-success-subtle rounded-3'>8</Col>
                    <Col className='text-center py-2 border border-success-subtle rounded-3'>9</Col>
                </Row>
                <Row className='mt-1 gap-1 px-2'>
                    <Col className='text-center py-2 text-secondary border rounded-4'>C</Col>
                    <Col className='text-center py-2 border rounded-3 border-success-subtle'>0</Col>
                    <Col className='text-center py-2 text-secondary border rounded-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
                            <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                            <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                        </svg>
                    </Col>
                </Row>
            </Container>

            <footer className='p-2 d-flex'>
                <Button variant='secondary' className='fw-medium fs-4 me-1' style={{width:'40%'}}>
                    닫기
                </Button>
                <Button variant='success' className='fw-medium fs-4 flex-grow-1'>
                    장바구니 추가
                </Button>
            </footer>
        </div>
    );

}

export default TestPage;
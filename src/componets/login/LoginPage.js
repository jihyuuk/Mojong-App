import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import JoinPage from './JoinPage';

function LonginPage() {



    return (
        <div className='bg-body-secondary'>

        <div className='text-center bg-white p-5 m-auto' style={{ maxWidth: '400px',height:'100%' }}>
            <img src={process.env.PUBLIC_URL + '/logoTest.png'} className='w-50' />
            <h3 className='my-4'>로그인</h3>
            <Form action='/' method='post'>
                <FloatingLabel controlId="loginId" label="직원명" className="mb-2">
                    <Form.Control type="text" placeholder="홍길동" />
                </FloatingLabel>
                <FloatingLabel controlId="loginPassword" label="비밀번호" className="mb-3">
                    <Form.Control type="password" placeholder="비밀번호" />
                </FloatingLabel>
                <div className='d-flex justify-content-between'>
                    <Form.Check type="switch" id="autoLogin" label="자동로그인" className='text-start mb-4' defaultChecked />
                    <Link to='/join'>회원가입</Link>
                </div>
                <Button type='submit' className='w-100 py-2'>로그인</Button>
            </Form>
        </div>

        </div>
    );
}

export default LonginPage;
import React from 'react';
import { Button, FloatingLabel, Form  } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function JoinPage(){
    return(
        <div className='bg-body-secondary'>

        <div className='text-center bg-white p-5 m-auto' style={{ maxWidth: '400px',height:'100%' }}>
            <h3 className='my-4'>회원가입</h3>
            <Form action='/' method='post' className='mb-4'>
                <FloatingLabel controlId="joinId" label="직원명" className="mb-3">
                    <Form.Control type="text" placeholder="홍길동" />
                </FloatingLabel>
                <FloatingLabel controlId="joinPassword" label="비밀번호" className="mb-2">
                    <Form.Control type="password" placeholder="비밀번호" />
                </FloatingLabel>
                <FloatingLabel controlId="joinPasswordCheck" label="비밀번호 확인" className="mb-3">
                    <Form.Control type="password" placeholder="비밀번호" />
                </FloatingLabel>
                <Button type='submit' className='w-100 py-2'>가입신청</Button>
            </Form>

            <Link to='/login'>로그인 페이지</Link>
        </div>
        </div>
    );
}

export default JoinPage;
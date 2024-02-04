import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../App';

function LonginPage() {

    //인풋값
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(true);

    //검증
    const [isInValidName, setIsInValidName] = useState(false);
    const [isInValidPwd, setIsInValidPwd] = useState(false);
    const [feedbackName, setFeedbackName] = useState();
    const [feedbackPwd, setFeedbackPwd] = useState();

    //토큰
    const { token, setToken } = useContext(TokenContext);

    //리다이렉트
    const navigate = useNavigate();

    //로그인 버튼 클릭 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //입력칸이 비었을시
        if(username === '' || password === ''){
            if(username === ''){
                setFeedbackName('직원명을 입력해주세요');
                setIsInValidName(true);
            }
            if(password === ''){
                setFeedbackPwd('비밀번호를 입력해주세요')
                setIsInValidPwd(true);
            }
            return;
        }

        //서버 로그인 요청
        try {
            const response = await axios.post('http://192.168.0.3:8080/login', `username=${username}&password=${password}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            //로그인 성공시
            if (response.status === 200) {
                //jwt추출
                const getToken = response.headers.getAuthorization();
                //토큰 설정
                setToken(getToken);
                //토큰 스토리지에 저장
                localStorage.setItem('jwtToken',getToken);
                //리다이렉트
                navigate("/");
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                //로그인 거부시
                setIsInValidName(true);
                setIsInValidPwd(true);
                setFeedbackName('');
                setFeedbackPwd('직원명 또는 비밀번호가 일치하지 않습니다.');
            } else {
                //기타 서버 오류
                console.error('로그인 중 서버 연결 실패 :', error.message);
                alert("서버 연결 실패! 관리자에게 문의하세요");
            }
        }
    }

    const nameChange = (value) => {
        setUsername(value);
        if(isInValidName) setIsInValidName(false);
    }

    const pwdChange = (value) => {
        setPassword(value);
        if(isInValidPwd) setIsInValidPwd(false);
    }


    return (
        <div className='bg-body-secondary'>

            <div className='text-center bg-white p-5 m-auto' style={{ maxWidth: '400px', height: '100%' }}>
                <img src={process.env.PUBLIC_URL + '/logoTest.png'} className='w-50' />
                <h3 className='my-4'>로그인</h3>
                <Form noValidate onSubmit={handleSubmit}>
                    <FloatingLabel controlId="loginId" label="직원명" className="mb-2">
                        <Form.Control type="text" placeholder="홍길동" value={username} onChange={(e) => nameChange(e.target.value.trim())} isInvalid={isInValidName} />
                        <Form.Control.Feedback type="invalid" className='text-start'>{feedbackName}</Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="loginPassword" label="비밀번호" className="mb-3">
                        <Form.Control type="password" placeholder="비밀번호" value={password} onChange={(e) => pwdChange(e.target.value.trim())} isInvalid={isInValidPwd} />
                        <Form.Control.Feedback type="invalid" className='text-start'>{feedbackPwd}</Form.Control.Feedback>
                    </FloatingLabel>

                    <div className='d-flex justify-content-between'>
                        <Form.Check type="switch" id="autoLogin" label="자동로그인" className='text-start mb-4' checked={autoLogin} onChange={() => setAutoLogin(!autoLogin)} />
                        <Link to='/join'>회원가입</Link>
                    </div>
                    <Button type='submit' className='w-100 py-2'>로그인</Button>
                </Form>
            </div>

        </div>
    );
}

export default LonginPage;
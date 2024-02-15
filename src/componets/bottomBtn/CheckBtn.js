import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FinalPrice, SalePrice, ShoppingCartContext, TokenContext, TotalPrice } from '../../App';
import axios from 'axios';

function CheckBtn(props) {

    const { totalPrice } = useContext(TotalPrice);
    const { salePrice } = useContext(SalePrice);
    const { finalPrice } = useContext(FinalPrice);

    const { token, setToken } = useContext(TokenContext);
    const { cart, setCart } = useContext(ShoppingCartContext);
    const [loading, setLoading] = useState(false);


    const sale = async () => {

        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/sale',
                {
                    'items': cart,
                    'totalPrice': totalPrice,
                    'salePrice': salePrice,
                    'finalPrice':finalPrice,
                    'pay': props.pay
                },
                {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });

            if (response.status === 200) {
                //데이터 불러오기성공시
                //리다이렉트
                window.location.replace('/');
            } else if (response.status === 201) {
                //토큰갱신
                const newToken = response.headers.get('Authorization');
                localStorage.setItem('jwtToken', newToken);
                setToken(newToken);

                console.log("토큰이 갱신되었습니다.");

                //데이터 불러오기성공시
                //리다이렉트
                window.location.replace('/');
            } else {
                //지정하지 않은 상태코드
                console.error('서버 응답 상태코드 에러 : ' + response.status)
            }

        } catch (error) {
            if (error.response && error.response.status === 403) {
                //토큰 지우기
                setToken();
                localStorage.removeItem('jwtToken');
                console.error('권한이 없습니다.');
            } else {
                console.error('서버 연결 중 오류 발생.', error.message);
            }
        }

        //로딩끝
        setLoading(false);
    }


    const handleClick = () => {
        setLoading(true);
        sale();
    }

    return (
        <div className='bg-white p-3 border-top'>
            <Button variant='success' className='w-100 fs-4 fw-semibold' disabled={props.disabled} onClick={() => handleClick()}>계산완료</Button>
        </div>
    );
}

export default CheckBtn;
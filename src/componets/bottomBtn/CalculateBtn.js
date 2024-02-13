import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext, TokenContext, TotalPrice } from '../../App';
import axios from 'axios';

function CalculateBtn() {

    const { token, setToken } = useContext(TokenContext);
    const { totalPrice } = useContext(TotalPrice);
    const { cart } = useContext(ShoppingCartContext);
    const [loading, setLoading] = useState(false);


    const sale = async () => {

        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/sale',{
                'username' : '홍길동','items' : cart, 'total' : totalPrice
            } ,{
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                //데이터 불러오기성공시
                alert('성공'+response.data);
            } else if (response.status === 201) {
                //토큰갱신
                const newToken = response.headers.get('Authorization');
                localStorage.setItem('jwtToken', newToken);
                setToken(newToken);

                console.log("토큰이 갱신되었습니다.");

                //데이터 불러오기성공시
                alert('성공'+response.data);
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


const handleclick = () => {
    setLoading(true);
    sale();
}

return (
    <div id='goToCart-btn'>
        <div className='text-center border-top bg-white'>

            {totalPrice <= 0 &&
                <Link to='/custom-item' className='text-decoration-none' replace={true} >
                    <div className='py-2 fs-4 text-secondary'>
                        + 직접입력하기
                    </div>
                </Link>
            }

            {totalPrice > 0 &&
                <div className='w-100 p-3 border-top' >
                    <Link to='/shopping-cart' replace={true} className='btn btn-success fs-5 p-2 px-3 rounded-3 w-100' onClick={() => handleclick()}>
                        <div><span className='fw-semibold'>{totalPrice}</span>원 정산하기</div>
                    </Link>
                </div>
            }

        </div>
    </div>
);

        }

export default CalculateBtn;
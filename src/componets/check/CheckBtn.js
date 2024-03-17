import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useCart } from '../../custom/provider/CartContext';
import ServerApi from '../../server/ServerApi';
import { useToken } from '../../custom/provider/TokenContext';

function CheckBtn({ props }) {

    const { cart, totalPrice } = useCart();

    const { pay, salePrice, finalPrice } = props;

    const { token, removeToken, updateToken } = useToken();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('loading');

    const handleClick = () => {
        setLoading(true);
        ServerApi('post', '/sale',
            {
                'items': cart,
                'totalPrice': totalPrice,
                'salePrice': salePrice,
                'finalPrice': finalPrice,
                'pay': pay
            },
            token, removeToken, updateToken
        )
            .then(response => {
                setSuccess('success');
                setTimeout(() => {
                    window.location.replace('/');
                }, 2000)
            })
            .catch(error => {
                //에러처리
                setSuccess('fail');
                setTimeout(() => {
                    setLoading(false);
                }, 2000)
            })
    }

    //정산 로딩중
    if (loading) {
        return (
            <div className='position-absolute h-100 w-100 bg-white p-3 z-2'>

                <div className='d-flex align-items-center justify-content-center h-100'>
                    <div className='text-center'>
                        {success != 'fail' ?
                            <div class={`circle-loader ${success === 'success' ? 'load-complete' : ''}`}>
                                {success === 'success' && <div class="checkmark draw"></div>}
                            </div>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-exclamation-circle text-danger" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                            </svg>
                        }

                        {success === 'loading' && <div class="fs-2 mt-4 text-secondary fw-medium">처리중..</div>}
                        {success === 'success' && <div class="fs-2 mt-4 text-success fw-medium">정산완료</div>}
                        {success === 'fail' && <div class="fs-2 mt-4 text-danger fw-medium">정산실패</div>}
                    </div>
                </div>


            </div>
        );
    }

    return (
        <div className='bg-white p-3 border-top'>
            <Button variant='success' className='w-100 fs-4 fw-semibold' disabled={finalPrice <= 0} onClick={() => handleClick()}>정 산 완 료</Button>
        </div>
    );
}

export default CheckBtn;
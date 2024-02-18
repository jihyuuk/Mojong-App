import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../custom/provider/CartContext';

function CalculateBtn() {

    const { cart, totalQuantity, totalPrice } = useCart();

    return (
        <div id='goToCart-btn'>
            <div className='text-center border-top bg-white'>

                {totalPrice > 0 &&
                    <div className='w-100 p-2 pt-0' >
                        <div className='p-2 d-flex justify-content-between text-secondary'>
                            <div>품목 <span className='fw-semibold'>{cart.length}</span> · 수량 <span className='fw-semibold'>{totalQuantity}</span></div>
                            <div className='text-success'>총 합계 <span className='fw-semibold'>{totalPrice}</span>원</div>
                        </div>
                        <Link to='/check' replace={true} className='btn btn-success fs-5 p-2 px-3 rounded-3 w-100' >
                            <div className='fw-semibold'>정산하기</div>
                        </Link>
                    </div>
                }

            </div>
        </div>
    );

}

export default CalculateBtn;
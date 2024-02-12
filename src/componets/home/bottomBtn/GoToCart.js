import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {  TotalPrice } from '../../../App';

function GoToCart() {

    const { totalPrice } = useContext(TotalPrice);

    if (totalPrice <= 0) {
        return (<></>);
    }

    return (
        <div id='goToCart-btn'>
            <div className='text-center p-3 border-top bg-white'>
                <Link to='/shopping-cart' replace={true} className='btn btn-success w-100 fs-4 fw-semibold p-2 rounded-3'>
                    {totalPrice}원 <span className='fw-medium'>계산하기</span>
                </Link>
            </div>
        </div>
    );
}

export default GoToCart;
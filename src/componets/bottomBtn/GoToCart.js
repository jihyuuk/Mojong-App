import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../customProvider/CartContext';

function GoToCart() {

    const { finalPrice } = useCart();

    if (finalPrice <= 0) {
        return (<></>);
    }

    return (
        <div id='goToCart-btn'>
            <div className='text-center p-2 border-top bg-white'>
                <Link to='/shopping-cart' replace={true} className='btn btn-success w-100 fs-5 fw-semibold p-2 rounded-3'>
                    {finalPrice}원 <span className='fw-medium'>장바구니</span>
                </Link>
            </div>
        </div>
    );
}

export default GoToCart;
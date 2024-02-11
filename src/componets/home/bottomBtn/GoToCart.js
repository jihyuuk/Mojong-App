import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../../App';

function GoToCart() {

    const { cart } = useContext(ShoppingCartContext);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let tempTotal = 0;
        cart.forEach(item => {
            tempTotal += item.price * item.count;
        });
        setTotal(tempTotal);
    }, [cart]);


    if (cart.length <= 0) {
        return (<></>);
    }

    return (
        <div id='goToCart-btn'>
            <div className='text-center p-3 border bg-white'>
                <Link to='/shopping-cart' replace={true} className='btn btn-success w-100 fs-4 fw-semibold p-2 rounded-3'>
                    {total}원 <span className='fw-medium'>계산하기</span>
                </Link>
            </div>
        </div>
    );
}

export default GoToCart;
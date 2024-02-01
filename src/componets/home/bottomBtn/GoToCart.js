import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../../App';

function GoToCart() {

    const { cart } = useContext(ShoppingCartContext);
    const [total , setTotal] = useState(0);

    useEffect(()=>{
        let tempTotal = 0;
        cart.forEach(item => {
            tempTotal += item.price*item.count;
        });
        setTotal(tempTotal);
    },[cart]);

    return (
        <>
            {cart.length === 0 && <div></div>}

            {
                cart.length !== 0 &&
                <div className='text-center sticky-bottom pb-4'>
                    <Link to='/shopping-cart' className='btn btn-primary fs-4 py-2 px-3 shadow'>
                    {total}원 · 장바구니 보기
                    </Link>
                </div>
            }
        </>
    );
}

export default GoToCart;
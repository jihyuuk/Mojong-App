import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { TokenContext } from '../../App';
import axios from 'axios';
import { useCart } from '../../custom/provider/CartContext';
import ServerApi from '../../server/ServerApi';
import { useToken } from '../../custom/provider/TokenContext';

function CheckBtn({props}) {

    const { cart, totalPrice} = useCart();

    const { disabled, pay, salePrice, finalPrice} = props;

    const {token, removeToken, updateToken} = useToken();

    const sale = () => {

        ServerApi('post','/sale',
        {
            'items': cart,
            'totalPrice': totalPrice,
            'salePrice': salePrice,
            'finalPrice':finalPrice,
            'pay': pay
        },
        token, removeToken, updateToken
        )
        .then(response => {
            window.location.replace('/');
        })
        .catch(error => {
            //에러처리
        })

    }


    const handleClick = () => {
        sale();
    }

    return (
        <div className='bg-white p-3 border-top'>
            <Button variant='success' className='w-100 fs-4 fw-semibold' disabled={disabled} onClick={() => handleClick()}>정산완료</Button>
        </div>
    );
}

export default CheckBtn;
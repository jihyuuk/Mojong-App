import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartContext, TokenContext, TotalPrice } from '../../App';
import axios from 'axios';

function CalculateBtn() {

    const { totalPrice } = useContext(TotalPrice);


    return (
        <div id='goToCart-btn'>
            <div className='text-center border-top bg-white'>

                {totalPrice <= 0 &&
                    <Link to='/custom-item' className='text-decoration-none border-bottom' replace={true} >
                        <div className='py-2 fs-4 text-secondary'>
                            + 직접입력하기
                        </div>
                    </Link>
                }

                {totalPrice > 0 &&
                    <div className='w-100 p-2' >
                        <Link to='/check' replace={true} className='btn btn-success fs-5 p-2 px-3 rounded-3 w-100' >
                            <div><span className='fw-semibold'>{totalPrice}</span>원 정산하기</div>
                        </Link>
                    </div>
                }

            </div>
        </div>
    );

}

export default CalculateBtn;
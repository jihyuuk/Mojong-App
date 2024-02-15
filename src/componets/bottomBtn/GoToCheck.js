import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FinalPrice } from '../../App';

function CalculateBtn() {

    const { finalPrice } = useContext(FinalPrice);

    return (
        <div id='goToCart-btn'>
            <div className='text-center border-top bg-white'>
                {finalPrice > 0 &&
                    <div className='w-100 p-2' >
                        <Link to='/check' replace={true} className='btn btn-success fs-5 p-2 px-3 rounded-3 w-100' >
                            <div><span className='fw-semibold'>{finalPrice}</span>원 정산하기</div>
                        </Link>
                    </div>
                }

            </div>
        </div>
    );

}

export default CalculateBtn;
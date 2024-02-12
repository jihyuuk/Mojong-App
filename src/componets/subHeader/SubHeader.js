import React from 'react';
import { Link } from 'react-router-dom';

function SubHeader(props) {

    {/* 장바구니,영수증 헤더 */ }

    return (
        < header className='border-success-subtle border-bottom border-2 fw-bold fs-3 p-3 d-flex bg-white shadow-sm' >
            {/* 뒤로가기 아이콘*/}
            <Link to="/" replace={true} className='d-flex align-items-center text-secondary' >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
            </Link>

            <p className='ms-3 mb-0'>{props.value}</p>
        </header >
    );
}

export default SubHeader;
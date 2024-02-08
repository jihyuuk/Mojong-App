import React from 'react';
import ReceiptView from './receipt/ReceiptView';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import { Button } from 'react-bootstrap';

function Receipt() {

    return (
        <div className='bg-white h-100 d-flex flex-column'>

            {/* 헤더 */}
            <header className='border-bottom bg-white fw-bold fs-3 p-3 d-flex'>
                {/* 뒤로가기 아이콘*/}
                <Link to="/" replace={true} className='d-flex align-items-center text-secondary'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                </Link>

                <p className='ms-3 mb-0'>영수증 미리보기</p>
            </header>

            {/* 콘텐츠 영역 */}
            <div className='overflow-auto h-100 bg-info'>
                {/* 내용 */}
                <ReceiptView></ReceiptView>
            </div>

            <Footer value={'receipt'}></Footer>
        </div>
    );
}

export default Receipt;
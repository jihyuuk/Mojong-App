import React from 'react';
import ReceiptView from './receipt/ReceiptView';
import Footer from '../footer/Footer';
import SubHeader from '../subHeader/SubHeader';

function Receipt() {

    return (
        <div className='my-container'>

            {/* 헤더 */}
            <SubHeader value='영수증 미리보기' to='/'></SubHeader>

            {/* 콘텐츠 영역 */}
            <ReceiptView></ReceiptView>

            {/* 푸터 */}
            <Footer value={'receipt'}></Footer>
        </div>
    );
}

export default Receipt;
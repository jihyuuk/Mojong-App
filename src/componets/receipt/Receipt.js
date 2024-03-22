import React from 'react';
import ReceiptView from './receipt/ReceiptView';
import SubHeader from '../common/SubHeader'

function Receipt() {

    return (
        <div className='my-container'>

            {/* 헤더 */}
            <SubHeader value='영수증 미리보기' to='/'></SubHeader>

            {/* 콘텐츠 영역 */}
            <ReceiptView></ReceiptView>

        </div>
    );
}

export default Receipt;
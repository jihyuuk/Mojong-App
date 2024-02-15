import React from 'react';
import SubHeader from '../subHeader/SubHeader';
import SaleDetailView from './SaleDetailView';

function SaleDetail() {

    return (
        <div className='my-container'>

            {/* 헤더 */}
            <SubHeader value='판매상세' to='/history'></SubHeader>

            {/* 내용 */}
            <SaleDetailView></SaleDetailView>

        </div>
    );
}

export default SaleDetail;
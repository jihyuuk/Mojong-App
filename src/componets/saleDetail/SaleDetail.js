import React from 'react';
import SubHeader from '../common/SubHeader'
import SaleDetailView from './SaleDetailView';
import { useSearchParams } from 'react-router-dom';

function SaleDetail() {

    const [params] = useSearchParams();
    const fromAll = params.get('fromAll');

    return (
        <div className='my-container'>

            {/* 헤더 */}
            <SubHeader value='판매상세' to={fromAll ? '/all-history' : '/history'}></SubHeader>

            {/* 내용 */}
            <SaleDetailView></SaleDetailView>

        </div>
    );
}

export default SaleDetail;
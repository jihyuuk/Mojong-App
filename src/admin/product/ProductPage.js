import React, { useEffect, useState } from 'react';
import SubHeader from '../../componets/common/SubHeader';
import CategoryView from './view/CategoryView';
import ProductView from './view/ProductView';
import { useMojong } from '../../custom/provider/MojongContext';

function ProductPage() {

    const [selected, setSelected] = useState('category');
    const { fetchMojong } = useMojong();

    //처음 마운트시 모종 정보 새로고침
    useEffect(()=>{
        fetchMojong();
    },[])

 
    return (
        <div className='my-container'>

            {/* 헤더 */}
            <SubHeader value='상품관리' to='/'></SubHeader>

            {/* 카테고리 */}
            <div className='d-flex bg-white fs-5 fw-medium text-secondary border-bottom'>
                <div className={`text-center py-2 w-100 ${selected === 'category' ? 'selected' : ''}`} onClick={() => setSelected('category')}>카테고리</div>
                <div className='border-end'></div>
                <div className={`text-center py-2 w-100 ${selected === 'product' ? 'selected' : ''}`} onClick={() => setSelected('product')}>상품</div>
            </div>

            {/* 뷰 */}
            {selected === 'category' ? <CategoryView/> : <ProductView/>}

        </div>
    );
}

export default ProductPage;
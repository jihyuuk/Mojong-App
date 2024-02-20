import React from 'react';
import CartView from './cart/CartView';
import Footer from '../common/Footer';
import SubHeader from '../common/SubHeader'
import GoToCheck from './cart/GoToCheck'

function ShoppingCart() {


    return (
        <div className='my-container'>

            {/* 헤더 */}
            <SubHeader value='장바구니' to='/'></SubHeader>

            {/* 콘텐츠 영역 */}
            <CartView />

            {/* 하단버튼 */}
            <GoToCheck></GoToCheck>

            {/* 푸터 */}
            {/* <Footer value={'cart'}></Footer> */}
        </div>
    );
}

export default ShoppingCart;
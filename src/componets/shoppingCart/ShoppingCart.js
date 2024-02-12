import React from 'react';
import CartView from './cart/CartView';
import Footer from '../footer/Footer';
import SubHeader from '../subHeader/SubHeader';

function ShoppingCart() {


    return (
        <div className='my-container'>

            {/* 헤더 */}
            <SubHeader value="장바구니"></SubHeader>

            {/* 콘텐츠 영역 */}
            <CartView />

            {/* 푸터 */}
            <Footer value={'cart'}></Footer>
        </div>
    );
}

export default ShoppingCart;
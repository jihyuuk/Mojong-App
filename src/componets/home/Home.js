import React from 'react';
import Category from './category/Category';
import Header from './header/Header';
import Section from './section/Section';
import GoToCart from './bottomBtn/GoToCart';

function Home() {
    return (
        <>
            {/* 헤더 상단 */}
            <Header></Header>

            {/* 센션*/}
            <Section></Section>

            {/*하단 장바구니 버튼 */}
            <GoToCart></GoToCart>

            {/* 푸터*/}
            <footer style={{ height: 200 }}>
            </footer>
        </>
    );
}

export default Home;
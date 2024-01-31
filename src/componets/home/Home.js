import React from 'react';
import Category from './category/Category';
import Header from './header/Header';
import Section from './section/Section';

function Home() {
    return (
        <>
            {/* 헤더 상단 */}
            <div className='sticky-top bg-white'>
                <Header></Header>
                <Category></Category>
            </div>

            {/* 센션*/}
            <Section></Section>

            {/* 푸터*/}
            <footer style={{ height: 200 }}>
            </footer>
        </>
    );
}

export default Home;
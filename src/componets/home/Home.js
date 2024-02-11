import React, { useContext, useEffect, useState } from 'react';
import Category from './category/Category';
import Header from './header/Header';
import Section from './section/Section';
import GoToCart from './bottomBtn/GoToCart';
import Footer from '../footer/Footer'
import { DataContext } from '../../App';

function Home() {

    const data = useContext(DataContext);
    const [selectedCategory, setSelectedCategory] = useState(data[0].category);
    const [items, setItems] = useState(data[0].items)

    //카테고리 바뀌면 내용 바꾸기
    useEffect(() => {
        const category = data.find((category) => category.category === selectedCategory);
        setItems(category.items);
    }, [selectedCategory]);


    //높이설정
    useEffect(() => { }, [])//처음 마운트 될때만 실행

    return (
        <div id='home' className='h-100'>
            <div className='my-container'>

                {/* 헤더 */}
                <Header></Header>

                {/* 카테고리 */}
                <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}></Category>

                {/* 센션*/}
                <Section items={items}></Section>

                {/*하단 장바구니 버튼 */}
                <GoToCart></GoToCart>

                {/* 푸터 */}
                <Footer value={'home'}></Footer>
                
            </div>
        </div>
    );
}

export default Home;